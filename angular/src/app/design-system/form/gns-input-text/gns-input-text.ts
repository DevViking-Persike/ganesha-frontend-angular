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

let nextInputTextId = 0;

@Component({
  selector: 'gns-input-text',
  templateUrl: './gns-input-text.html',
  styleUrls: ['./gns-input-text.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsInputText implements ControlValueAccessor {
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
  readonly type = input('text');
  readonly additionalCssClass = input<string | null>(null);

  readonly valueChange = output<string>();

  private readonly _cvaValue = signal<string | null>(null);
  private readonly _cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly inputId = `gns-input-${++nextInputTextId}`;
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

  protected readonly describedBy = computed<string | null>(() => {
    if (this.hasError()) return this.errorId;
    if (this.helperText()?.trim()) return this.helperId;
    return null;
  });

  protected readonly sizeClass = computed(() => {
    switch (this.size()) {
      case 'small':
        return 'gns-input-text--sm';
      case 'large':
        return 'gns-input-text--lg';
      default:
        return 'gns-input-text--md';
    }
  });

  protected readonly wrapperClass = computed(() =>
    cssClasses(
      'gns-input-text',
      this.sizeClass(),
      this.hasError() && 'gns-input-text--error',
      this.disabled() && 'gns-input-text--disabled',
      this.isReadOnly() && 'gns-input-text--readonly',
      this.iconLeft()?.trim() && 'gns-input-text--icon-left',
      this.additionalCssClass(),
    ),
  );

  protected readonly inputClass = computed(() =>
    cssClasses(
      'gns-input-text__field',
      this.hasError() && 'gns-input-text__field--error',
    ),
  );

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
