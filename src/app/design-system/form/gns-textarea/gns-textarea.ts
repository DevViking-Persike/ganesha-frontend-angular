import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  effect,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

let nextTextareaId = 0;

@Component({
  selector: 'gns-textarea',
  templateUrl: './gns-textarea.html',
  styleUrls: ['./gns-textarea.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsTextarea implements ControlValueAccessor {
  readonly value = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorMessage = input<string | null>(null);
  readonly rows = input(3, { transform: numberAttribute });
  readonly isRequired = input(false, { transform: booleanAttribute });
  readonly isDisabled = input(false, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  readonly valueChange = output<string>();

  private readonly _cvaValue = signal<string | null>(null);
  private readonly _cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly textareaId = `gns-textarea-${++nextTextareaId}`;
  protected readonly errorId = `${this.textareaId}-error`;
  protected readonly helperId = `${this.textareaId}-helper`;

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

  protected readonly wrapperClass = computed(() =>
    cssClasses(
      'gns-textarea',
      this.hasError() && 'gns-textarea--error',
      this.disabled() && 'gns-textarea--disabled',
      this.additionalCssClass(),
    ),
  );

  protected readonly textareaClass = computed(() =>
    cssClasses(
      'gns-textarea__field',
      this.hasError() && 'gns-textarea__field--error',
    ),
  );

  protected handleInput(event: Event): void {
    if (this.disabled()) return;
    const next = (event.target as HTMLTextAreaElement).value ?? '';
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
