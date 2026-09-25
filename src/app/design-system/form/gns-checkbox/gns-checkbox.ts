import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-checkbox',
  templateUrl: './gns-checkbox.html',
  styleUrls: ['./gns-checkbox.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsCheckbox implements ControlValueAccessor {
  readonly value = input(false, { transform: booleanAttribute });
  readonly label = input<string | null>(null);
  readonly isDisabled = input(false, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  readonly valueChange = output<boolean>();

  /** Last value written by ControlValueAccessor (ngModel/formControl). */
  private readonly _cvaValue = signal<boolean | null>(null);
  private readonly _cvaDisabled = signal(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.value();
      this._cvaValue.set(null);
    });
  }

  protected readonly checked = computed(
    () => this._cvaValue() ?? this.value(),
  );

  protected readonly disabled = computed(
    () => this.isDisabled() || this._cvaDisabled(),
  );

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-checkbox',
      this.checked() && 'gns-checkbox--checked',
      this.disabled() && 'gns-checkbox--disabled',
      this.additionalCssClass(),
    ),
  );

  protected handleChange(event: Event): void {
    if (this.disabled()) return;
    const checked = (event.target as HTMLInputElement).checked;
    this._cvaValue.set(checked);
    this.valueChange.emit(checked);
    this.onChange(checked);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this._cvaValue.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }
}
