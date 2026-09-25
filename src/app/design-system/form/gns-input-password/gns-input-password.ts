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
import type { InputSize } from '../types';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

let nextInputPasswordId = 0;

@Component({
  selector: 'gns-input-password',
  templateUrl: './gns-input-password.html',
  styleUrls: ['./gns-input-password.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsInputPassword implements ControlValueAccessor {
  readonly value = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorMessage = input<string | null>(null);
  readonly isRequired = input(false, { transform: booleanAttribute });
  readonly isDisabled = input(false, { transform: booleanAttribute });
  readonly isReadOnly = input(false, { transform: booleanAttribute });
  readonly size = input<InputSize>('medium');
  readonly iconLeft = input<string | null>(null);
  readonly showToggle = input(true, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  readonly valueChange = output<string>();

  private readonly _cvaValue = signal<string | null>(null);
  private readonly _cvaDisabled = signal(false);
  protected readonly isVisible = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly inputId = `gns-input-pw-${++nextInputPasswordId}`;
  protected readonly errorId = `${this.inputId}-error`;
  protected readonly helperId = `${this.inputId}-helper`;

  constructor() {
    effect(() => {
      this.value();
      this._cvaValue.set(null);
    });
  }

  protected readonly innerValue = computed(
    () => this._cvaValue() ?? this.value() ?? '',
  );

  protected readonly disabled = computed(
    () => this.isDisabled() || this._cvaDisabled(),
  );

  protected readonly hasError = computed(
    () => !!this.errorMessage()?.trim(),
  );

  protected readonly inputType = computed(() =>
    this.isVisible() ? 'text' : 'password',
  );

  protected readonly describedBy = computed<string | null>(() => {
    if (this.hasError()) return this.errorId;
    if (this.helperText()?.trim()) return this.helperId;
    return null;
  });

  protected readonly sizeClass = computed(() => {
    switch (this.size()) {
      case 'small':
        return 'gns-input-password--sm';
      case 'large':
        return 'gns-input-password--lg';
      default:
        return 'gns-input-password--md';
    }
  });

  protected readonly wrapperClass = computed(() =>
    cssClasses(
      'gns-input-password',
      this.sizeClass(),
      this.hasError() && 'gns-input-password--error',
      this.disabled() && 'gns-input-password--disabled',
      this.isReadOnly() && 'gns-input-password--readonly',
      this.iconLeft()?.trim() && 'gns-input-password--icon-left',
      this.additionalCssClass(),
    ),
  );

  protected readonly inputClass = computed(() =>
    cssClasses(
      'gns-input-password__field',
      this.hasError() && 'gns-input-password__field--error',
      this.showToggle() && 'gns-input-password__field--has-toggle',
    ),
  );

  // Eye icon with unicode fallback — projects swap with icon font classes.
  protected readonly toggleIconClass = computed(() =>
    this.isVisible()
      ? 'gns-input-password__toggle-icon gns-input-password__toggle-icon--hide'
      : 'gns-input-password__toggle-icon gns-input-password__toggle-icon--show',
  );

  protected toggleVisibility(): void {
    if (this.disabled()) return;
    this.isVisible.update((visible) => !visible);
  }

  protected handleInput(event: Event): void {
    if (this.disabled() || this.isReadOnly()) return;
    const next = (event.target as HTMLInputElement).value ?? '';
    this._cvaValue.set(next);
    this.valueChange.emit(next);
    this.onChange(next);
  }

  protected handleBlur(): void {
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
