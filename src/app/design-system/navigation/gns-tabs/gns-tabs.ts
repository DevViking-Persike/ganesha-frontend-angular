import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  numberAttribute,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { cssClasses } from '../css-classes';
import { GnsTab } from '../gns-tab/gns-tab';

@Component({
  selector: 'gns-tabs',
  templateUrl: './gns-tabs.html',
  styleUrl: './gns-tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class GnsTabs {
  readonly activeIndex = input(0, { transform: numberAttribute });
  readonly activeIndexChanged = output<number>();
  readonly additionalCssClass = input<string | null>(null);

  /** Equivalente ao `CascadingValue Value="this"` + `RegisterTab` do Blazor. */
  readonly tabs = contentChildren(GnsTab);

  readonly cssClass = computed(() =>
    cssClasses('gns-tabs', this.additionalCssClass()),
  );

  protected isActiveIndex(index: number): boolean {
    return index === this.activeIndex();
  }

  protected tabClass(index: number): string {
    const tab = this.tabs()[index];
    return cssClasses(
      'gns-tab',
      this.isActiveIndex(index) && 'gns-tab--active',
      tab?.isDisabled() && 'gns-tab--disabled',
    );
  }

  protected tabIconClass(tab: GnsTab): string {
    return cssClasses('gns-tab__icon', tab.icon());
  }

  protected handleTabClick(index: number): void {
    const tab = this.tabs()[index];
    if (tab && !tab.isDisabled()) {
      this.activeIndexChanged.emit(index);
    }
  }
}
