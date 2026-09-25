/** Mirror of Blazor `InputSize` enum (Small, Medium, Large). */
export type InputSize = 'small' | 'medium' | 'large';

/** Mirror of Blazor `FormFieldState` record (Models/Forms). */
export interface FormFieldState {
  value: string;
  isTouched: boolean;
  isValid: boolean;
  errorMessage: string | null;
  isDisabled: boolean;
}
