import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  input,
  viewChild,
} from '@angular/core';

/**
 * Port de `GnsTab.razor`. Assim como no Blazor, não renderiza markup direto:
 * o conteúdo é capturado em um `ng-template` e renderizado pelo `GnsTabs` pai,
 * que controla todo o rendering da strip e dos painéis.
 *
 * `encapsulation: None` porque o `GnsTab.razor.css` (copiado verbatim) estiliza
 * elementos (`.gns-tab`, `.gns-tab__panel`) renderizados pelo `GnsTabs`.
 */
@Component({
  selector: 'gns-tab',
  templateUrl: './gns-tab.html',
  styleUrl: './gns-tab.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GnsTab {
  readonly title = input('');
  readonly icon = input<string | null>(null);
  readonly isDisabled = input(false);

  readonly content = viewChild.required<TemplateRef<unknown>>('content');
}
