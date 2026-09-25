import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-action-list',
  templateUrl: './gns-action-list.html',
  styleUrls: ['./gns-action-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsActionList {
  readonly additionalCssClass = input<string | null>(null);

  protected readonly cssClass = computed(() =>
    cssClasses('gns-action-list', this.additionalCssClass()),
  );
}
