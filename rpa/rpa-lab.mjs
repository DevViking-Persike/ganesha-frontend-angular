// RPA de validação do Design Lab — navega como usuário real.
// Uso: node rpa/rpa-lab.mjs [filtro-de-rota]
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const HOST = process.env.WC_HOST ?? 'http://127.0.0.1:4200';
const filtro = process.argv[2] ?? '';

const ROTAS = [
  { path: '/lab', marcador: /Ganesha|Design Lab|Lab/i, nome: 'lab-home' },
  { path: '/lab/colors', marcador: /Color|Cores/i, nome: 'lab-colors' },
  { path: '/lab/typography', marcador: /Typography|Tipografia/i, nome: 'lab-typography' },
  { path: '/lab/spacing', marcador: /Spacing|Espaçamento/i, nome: 'lab-spacing' },
  { path: '/lab/shadows', marcador: /Shadow|Sombras/i, nome: 'lab-shadows' },
  { path: '/lab/buttons', marcador: /Button|Botões/i, nome: 'lab-buttons' },
  { path: '/lab/forms', marcador: /Form|Formulário/i, nome: 'lab-forms' },
  { path: '/lab/data-display', marcador: /Data Display|Badge|Table|Avatar/i, nome: 'lab-data-display' },
  { path: '/lab/feedback', marcador: /Feedback|Alert|Toast|Loader/i, nome: 'lab-feedback' },
  { path: '/lab/navigation', marcador: /Navigation|Breadcrumb|Tabs|Pagination/i, nome: 'lab-navigation' },
  { path: '/lab/surfaces', marcador: /Surface|Card|Panel/i, nome: 'lab-surfaces' },
  { path: '/lab/overlays', marcador: /Overlay|Modal|Drawer/i, nome: 'lab-overlays' },
  { path: '/lab/charts', marcador: /Chart|Gráfico/i, nome: 'lab-charts' },
  { path: '/lab/grid', marcador: /Grid|Layout/i, nome: 'lab-grid' },
  { path: '/lab/dashboard', marcador: /Dashboard/i, nome: 'lab-dashboard' },
  { path: '/lab/table', marcador: /Table|Tabela/i, nome: 'lab-table-page' },
  { path: '/lab/table-page', marcador: /Table|Tabela/i, nome: 'lab-table-page-alt' },
  { path: '/lab/form-page', marcador: /Form/i, nome: 'lab-form-page' },
  { path: '/lab/profile', marcador: /Profile|Perfil/i, nome: 'lab-profile' },
  { path: '/lab/auth', marcador: /Auth|Login|Sign/i, nome: 'lab-auth' },
];

mkdirSync('rpa/shots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const resultados = [];
for (const rota of ROTAS) {
  if (filtro && !rota.path.includes(filtro) && !rota.nome.includes(filtro)) continue;
  const consoleErrors = [];
  const onPageError = (e) => consoleErrors.push('pageerror: ' + e.message);
  const onConsole = (msg) => {
    if (msg.type() === 'error') consoleErrors.push('console: ' + msg.text().slice(0, 300));
  };
  page.on('pageerror', onPageError);
  page.on('console', onConsole);

  let status = 0;
  let body = '';
  try {
    const resp = await page.goto(HOST + rota.path, { waitUntil: 'load', timeout: 30000 });
    status = resp ? resp.status() : 0;
    await page.waitForTimeout(700);
    body = await page.textContent('body').catch(() => '');
    await page.screenshot({ path: `rpa/shots/${rota.nome}.png`, fullPage: false });
  } catch (e) {
    consoleErrors.push('nav: ' + String(e).slice(0, 300));
    await page.screenshot({ path: `rpa/shots/${rota.nome}.png`, fullPage: false }).catch(() => {});
  }
  page.off('pageerror', onPageError);
  page.off('console', onConsole);

  const vazio = !body || body.trim().length < 40;
  const marcadorOk = !!body && rota.marcador.test(body);
  const pass = status === 200 && marcadorOk && !vazio && consoleErrors.length === 0;
  resultados.push({
    rota: rota.path,
    nome: rota.nome,
    status,
    marcadorOk,
    vazio,
    erros: [...new Set(consoleErrors)].slice(0, 5),
    pass,
  });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${rota.path} status=${status} marcador=${marcadorOk} vazio=${vazio} erros=${consoleErrors.length}`);
}

await browser.close();

const linhas = resultados.map((r) =>
  `| ${r.pass ? '✅ PASS' : '❌ FAIL'} | \`${r.rota}\` | ${r.status} | ${r.marcadorOk ? 'sim' : 'não'}${r.vazio ? ' (vazia)' : ''} | ${r.erros.length ? '<br>' + r.erros.map((e) => e.replace(/\|/g, '\\|')).join('<br>') : '—'} |`,
);
const md = `# RPA Design Lab — ${new Date().toISOString()}

Alvo: ${HOST}

| Veredito | Rota | Status | Marcador | Erros |
|---|---|---|---|---|
${linhas.join('\n')}

**PASS: ${resultados.filter((r) => r.pass).length}/${resultados.length}**
`;
writeFileSync('rpa/relatorio.md', md);
writeFileSync('rpa/resultados.json', JSON.stringify(resultados, null, 2));
console.log(`\nPASS ${resultados.filter((r) => r.pass).length}/${resultados.length} — relatório em rpa/relatorio.md`);
