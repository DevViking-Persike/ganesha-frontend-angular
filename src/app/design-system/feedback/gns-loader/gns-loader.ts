import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LoaderSize } from '../types';

const SIZE_MODIFIER: Record<LoaderSize, string> = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
};

/**
 * Spinner loader with optional label.
 * Mirrors Blazor GnsLoader.
 */
@Component({
  selector: 'gns-loader',
  templateUrl: './gns-loader.html',
  styleUrl: './gns-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsLoader {
  readonly size = input<LoaderSize>('medium');
  readonly label = input<string | null>(null);
  readonly additionalCssClass = input<string | null>(null);

  protected readonly cssClass = computed(() =>
    [
      'gns-loader',
      `gns-loader--${SIZE_MODIFIER[this.size()]}`,
      this.additionalCssClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
