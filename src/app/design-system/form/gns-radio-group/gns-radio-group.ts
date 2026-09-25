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

let nextRadioGroupName = 0;

/**
 * Group for `gns-radio-option` children (replaces Blazor CascadingValue).
 * Options injetam a instância pai diretamente (node injector) — sem self-provide.
 */
@Component({
  selector: 'gns-radio-group',
  templateUrl: './gns-radio-group.html',
  styleUrls: ['./gns-radio-group.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsRadioGroup implements ControlValueAccessor {
  readonly value = input<string | null>(null);
  readonly name = input(`gns-radio-${++nextRadioGroupName}`);
  readonly label = input<string | null>(null);
  readonly isDisabled = input(false, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  readonly valueChange = output<string>();

  private readonly _cvaValue = signal<string | null>(null);
  private readonly _cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.value();
      this._cvaValue.set(null);
    });
  }

  /** Value exposed to GnsRadioOption children. */
  readonly currentValue = computed(
    () => this._cvaValue() ?? this.value() ?? '',
  );

  /** Disabled state exposed to GnsRadioOption children. */
  readonly groupDisabled = computed(
    () => this.isDisabled() || this._cvaDisabled(),
  );

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-radio-group',
      this.groupDisabled() && 'gns-radio-group--disabled',
      this.additionalCssClass(),
    ),
  );

  /** Called by child options (internal API, like Blazor's SelectOption). */
  selectOption(optionValue: string): void {
    if (this.groupDisabled()) return;
    this._cvaValue.set(optionValue);
    this.valueChange.emit(optionValue);
    this.onChange(optionValue);
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this._cvaValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }
}
