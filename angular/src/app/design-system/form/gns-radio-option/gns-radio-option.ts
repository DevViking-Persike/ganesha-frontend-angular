import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { GnsRadioGroup } from '../gns-radio-group/gns-radio-group';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-radio-option',
  templateUrl: './gns-radio-option.html',
  styleUrls: ['./gns-radio-option.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsRadioOption {
  /** Parent group (replaces Blazor CascadingParameter). */
  private readonly group = inject(GnsRadioGroup, { optional: true });

  readonly value = input('');
  readonly label = input('');
  readonly isDisabled = input(false, { transform: booleanAttribute });

  protected readonly isChecked = computed(
    () => this.group?.currentValue() === this.value(),
  );

  protected readonly isDisabledNow = computed(
    () => this.isDisabled() || (this.group?.groupDisabled() ?? false),
  );

  protected readonly groupName = computed(
    () => this.group?.name() ?? `gns-radio-ungrouped-${this.value()}`,
  );

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-radio-option',
      this.isChecked() && 'gns-radio-option--checked',
      this.isDisabledNow() && 'gns-radio-option--disabled',
    ),
  );

  protected handleChange(): void {
    if (this.isDisabledNow()) return;
    this.group?.selectOption(this.value());
  }
}
