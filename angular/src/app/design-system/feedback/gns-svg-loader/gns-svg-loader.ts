import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LoaderSize } from '../types';

const SIZE_MODIFIER: Record<LoaderSize, string> = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
};

/**
 * SVG mask fill loader (branded asset animation).
 * Mirrors Blazor GnsSvgLoader.
 */
@Component({
  selector: 'gns-svg-loader',
  templateUrl: './gns-svg-loader.html',
  styleUrl: './gns-svg-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsSvgLoader {
  readonly size = input<LoaderSize>('medium');
  readonly label = input<string | null>(null);
  readonly additionalCssClass = input<string | null>(null);
  readonly assetPath = input('_content/Ganesha.DesignLab.Shared/assets/loaders/loader-ganesha-a.svg');
  readonly aspectRatio = input('2816 / 1536');

  protected readonly cssClass = computed(() =>
    [
      'gns-svg-loader',
      `gns-svg-loader--${SIZE_MODIFIER[this.size()]}`,
      this.additionalCssClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly maskStyle = computed(() => {
    const url = this.assetPath();
    return [
      `-webkit-mask-image:url('${url}')`,
      `mask-image:url('${url}')`,
      '-webkit-mask-repeat:no-repeat',
      'mask-repeat:no-repeat',
      '-webkit-mask-position:center',
      'mask-position:center',
      '-webkit-mask-size:contain',
      'mask-size:contain',
    ].join(';');
  });
}
