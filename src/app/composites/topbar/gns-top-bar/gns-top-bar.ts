import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { cssClasses } from '../../../design-system/navigation/index';

@Component({
  selector: 'gns-top-bar',
  imports: [NgTemplateOutlet],
  templateUrl: './gns-top-bar.html',
  styleUrl: './gns-top-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsTopBar {
  readonly title = input<string | null>(null);
  readonly additionalCssClass = input<string | null>(null);

  /** `LeftContent` RenderFragment opcional: `<ng-template #gnsTopBarLeft>`. */
  protected readonly leftTpl = contentChild(
    'gnsTopBarLeft',
    { read: TemplateRef },
  );

  /** `RightContent` RenderFragment opcional: `<ng-template #gnsTopBarRight>`. */
  protected readonly rightTpl = contentChild(
    'gnsTopBarRight',
    { read: TemplateRef },
  );

  readonly onMenuToggle = output<void>();

  protected readonly hasLeftContent = computed(
    () => this.leftTpl() !== undefined,
  );
  protected readonly hasRightContent = computed(
    () => this.rightTpl() !== undefined,
  );

  protected readonly cssClass = computed(() =>
    cssClasses('gns-top-bar', this.additionalCssClass()),
  );

  protected handleMenuToggle(): void {
    this.onMenuToggle.emit();
  }
}
