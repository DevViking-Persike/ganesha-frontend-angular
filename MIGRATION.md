# Convenções de Migração Blazor → Angular (Ganesha DesignLab)

Este documento é o contrato para migrar componentes `.razor` do
`src/Ganesha.DesignLab.Shared` para o app Angular em `angular/`.

## Estrutura de destino

- Fonte Blazor: `src/Ganesha.DesignLab.Shared/Components/{DesignSystem|Composites|Lab}/...`
- Destino Angular: `angular/src/app/design-system/<categoria>/<componente>/` e
  `angular/src/app/composites/<componente>/`.
- Um diretório por componente com 3 arquivos:
  - `gns-<nome>.ts` — componente standalone
  - `gns-<nome>.html` — template
  - `gns-<nome>.css` — copiado **verbatim** do `.razor.css` correspondente

## Regras de conversão

1. **Selector**: `GnsButton` → `gns-button` (kebab-case do nome sem `Gns`).
   **Nome da classe exportada mantém o nome Blazor**: `GnsButton`, `GnsMetricGrid`, etc.
   Imports entre componentes usam caminhos relativos reais (ex. de
   `composites/<c>/gns-x/gns-x.ts` para `../../../design-system/actions`).
2. **Componentes**: standalone (`standalone: true` via `@Component` default no Angular 22),
   `changeDetection: ChangeDetectionStrategy.OnPush`, `encapsulation: ViewEncapsulation.None`
   NÃO usar — manter encapsulamento default (scoped), igual ao scoped CSS do Blazor.
   IMPORTANTE: usar `encapsulation: ViewEncapsulation.None` quando o `.razor.css` referencia
   elementos do conteúdo projetado (ChildContent/ng-content); nos casos normais manter default.
3. **Parâmetros** (`[Parameter]` → `@Input()`): `Title` → `title` (camelCase).
   Tipos C#: `string`→`string`, `int`→`number`, `bool`→`boolean`, `RenderFragment?`→projeção
   via `<ng-content>` (sem input), `EventCallback<T>`→`@Output() x = new EventEmitter<T>()`
   com nome camelCase (`OnClick`→`clicked`? NÃO: `OnClick`→`onClick` emitido em `(click)` custom;
   para eventos DOM nativos usar binding direto).
4. **Enums** (`ButtonVariant`, `BadgeSeverity`, etc.): type union TS
   (`export type ButtonVariant = 'primary' | 'secondary' | ...`) + valores default igual ao Blazor.
   Os `.razor` usam os enums como strings nas classes CSS — preservar exatamente os valores.
5. **Template Razor → HTML**:
   - `@onclick="Handler"` → `(click)="handler()"`
   - `@bind-Value="X"` → `[(ngModel)]="x"` (importar `FormsModule` nos componentes de formulário)
   - `@if (cond) { ... }` → `@if (cond) { ... }` (sintaxe de control flow do Angular) ou `*ngIf`
   - `@foreach (var item in Items)` → `@for (item of items; track item)` (control flow)
   - `@ChildContent` → `<ng-content></ng-content>`
   - `@key` → `track` do `@for`
   - `class="@CssClass"` mantém a interpolação `{{ cssClass() }}` ou `[class]`
   - `style="--x: @Y"` → `[style.--x]="y()"`
   - `data-*="@X"` → `[attr.data-x]="x()"`
   - `@onclick:stopPropagation` → `(click)="$event.stopPropagation(); handler()"`
   - `disabled="@IsDisabled"` → `[disabled]="isDisabled()"`
   - State do `@code { ... }` → signals (`private readonly _x = signal(...)`; expor como
     `readonly x = this._x.asReadonly()` quando lido no template) ou campos simples para inputs.
6. **Inputs com transforms**: números vindos de atributo HTML usam
   `input({ transform: booleanAttribute/numberAttribute })` quando aplicável.
7. **Lifecycle**: `OnInitialized` → `constructor`/`ngOnInit`; `IDisposable` → `DestroyRef`.
8. **Serviços injetados** (`@inject IThemeService ThemeService`): `inject(ThemeService)`.
   Mapa: `IThemeService`→`ThemeService` (`angular/src/app/services/theme.service.ts`),
   `IToastService`→`ToastService` (`toast.service.ts`), `IModalService`→`ModalService`
   (`modal.service.ts`), `IDrawerService`→`DrawerService` (`drawer.service.ts`).
9. **NavigationManager** → `Router` do Angular (`inject(Router)`, `router.navigate(...)`).
10. **CssClassBuilder** (`Extensions/CssClassBuilder.cs`): recriar helpers pequenos
    (`cssClasses(...parts: Array<string | false | null | undefined>)`) onde necessário, local ao componente.
11. **Barrels**: cada categoria `design-system/<categoria>/index.ts` exporta todos os componentes
    e tipos públicos do diretório.
12. **Nada de segredos/chaves** em nenhum arquivo criado (repo público).
13. Cada arquivo ≤ 300 linhas (Regra 1). Se o componente original for maior, dividir
    sub-componentes como no Blazor.
14. **JS interop** (`wwwroot/js/ganesha-charts.js`): portar para funções TS puras dentro do
    componente consumidor (SVG puro) — sem arquivos JS globais.

## Fontes a ler antes de migrar cada componente

O `.razor` (markup + `@code`) e o `.razor.css` (copiar verbatim). Os enums `.cs` do mesmo
diretório. Os modelos em `src/Ganesha.DesignLab.Shared/Models/**` quando referenciados.

## Verificação

`pnpm --dir angular build` deve compilar. Não deixar `TODO` no código entregue.
