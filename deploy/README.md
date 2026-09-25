# Operação do Ganesha DesignLab

Repo público: `DevViking-Persike/ganesha-frontend-angular`.
**Nenhum secret vive neste repositório** — credenciais vêm de GitHub Secrets
(`ZOT_USER`/`ZOT_PASSWORD`), do Infisical no cluster e do SSH local (`~/.ssh/devviking`).

## App

- Repo 100% Angular na raiz (app standalone Angular 22, Design System Ganesha migrado do Blazor).
- `rpa/` — RPA de validação das telas (Playwright).
- `run.sh` — dev/build/docker local.

## Esteira

1. Push na `main` ou `gh workflow run deploy.yml --ref main`.
2. CI: `pnpm install --frozen-lockfile`, `pnpm build`
   (build AOT cobre type-check), kustomize e `bash -n` dos scripts.
3. Build amd64 da imagem nginx, publicação HTTPS em `zot.victorpersike.dev.br/ganesha`
   e validação de arquitetura/digest no registry.
4. Commit automático na branch `gitops`, contendo só os manifests de
   `deploy/kubernetes` com a release e o digest publicados.
5. Argo CD, projeto/aplicação `ganesha`, sincroniza `gitops:.` no namespace
   `ganesha` com auto-sync, prune e self-heal.
6. A CI espera `/healthz` devolver a release exata e roda o smoke (página + redirect).

O workload roda no **h6** (nodeSelector `kubernetes.io/hostname: h6`). O cluster faz
pull via `127.0.0.1:30500/ganesha` (mesmo Zot, NodePort interno). O Operator gera o
secret `ganesha/zot-creds` a partir de `plataforma-dev-pg-zn`, ambiente `dev`, pasta `/zot`.

A branch `gitops` é independente para que o Argo leia apenas a implantação.
Não edite a imagem no cluster: self-heal restaura o Git. Rollback:

```bash
git fetch origin gitops
git worktree add /tmp/ganesha-rollback origin/gitops
git -C /tmp/ganesha-rollback revert <commit-da-release>
git -C /tmp/ganesha-rollback push origin HEAD:gitops
```

## DNS

Host: `ganesha.victorpersike.dev.br` (registro gerido no root de Terraform do
site-persike-svelte — não aplicar aqui). Criar o A record DNS-only para
`163.176.29.184` (flex1a), TTL 120, antes do primeiro deploy para o certificado
cloudflare resolver.

## Bootstrap único (após a primeira publicação criar a branch `gitops`)

```bash
./scripts/with-cluster.sh kubectl apply --server-side -f deploy/kubernetes/namespace.yaml
./scripts/with-cluster.sh kubectl apply --server-side -f deploy/argocd/project.yaml
./scripts/with-cluster.sh kubectl apply --server-side -f deploy/argocd/application.yaml
```

`scripts/with-cluster.sh` usa `~/.ssh/devviking`, obtém temporariamente o
kubeconfig do control-plane e abre túneis SSH pelo **h6** para API e registry.
O kubeconfig fica em diretório temporário restrito e é removido ao encerrar.
Nunca é enviado ao GitHub. Requer acesso administrativo de operador.
Overrides: `FLEX_SSH_IDENTITY`, `FLEX_CONTROL_PLANE` (padrão `ubuntu@163.176.83.58`),
`FLEX_WORKER` (padrão `h6`).

## Diagnóstico

```bash
./scripts/with-cluster.sh kubectl -n argocd get application ganesha
./scripts/with-cluster.sh kubectl -n ganesha get pods -o wide
./scripts/smoke.sh
```

## Segredos exigidos no GitHub (repo público → configurar em Settings > Secrets)

- `ZOT_USER`, `ZOT_PASSWORD` — push da imagem no Zot (mesmos do site-persike-svelte).
