import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-switch',
  templateUrl: './gns-switch.html',
  styleUrls: ['./gns-switch.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsSwitch {
  readonly value = input(false, { transform: booleanAttribute });
  readonly label = input<string | null>(null);
  readonly isDisabled = input(false, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  readonly valueChange = output<boolean>();

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-switch',
      this.value() && 'gns-switch--checked',
      this.isDisabled() && 'gns-switch--disabled',
      this.additionalCssClass(),
    ),
  );

  protected handleToggle(): void {
    if (this.isDisabled()) return;
    this.valueChange.emit(!this.value());
  }

  protected handleChange(event: Event): void {
    if (this.isDisabled()) return;
    const checked = (event.target as HTMLInputElement).checked;
    this.valueChange.emit(checked);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.valueChange.emit(!this.value());
    }
  }
}
