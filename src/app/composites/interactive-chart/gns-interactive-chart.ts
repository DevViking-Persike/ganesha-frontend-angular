import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    computed,
    inject,
    input,
    numberAttribute,
    output,
    signal,
} from '@angular/core';
import { GnsBarChart } from '../../design-system/charts/gns-bar-chart/gns-bar-chart';
import { GnsLineChart } from '../../design-system/charts/gns-line-chart/gns-line-chart';
import { ChartDataPoint, ChartSeries, cssClasses } from '../../design-system/charts/chart-models';
import { InteractiveChartOption, InteractiveChartType } from './interactive-chart-models';
import { attachChartInteractivity } from './chart-tooltip';

/**
 * GnsInteractiveChart — composite que alterna datasets de chart via opções.
 * A interatividade (tooltips) dos charts internos era JS interop global
 * (ganesha-charts.js) e foi portada para TS puro em ./chart-tooltip.ts.
 */
@Component({
    selector: 'gns-interactive-chart',
    templateUrl: './gns-interactive-chart.html',
    styleUrls: ['./gns-interactive-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsBarChart, GnsLineChart],
})
export class GnsInteractiveChart {
    readonly title = input('Chart');
    readonly chartType = input<InteractiveChartType>('bar');
    readonly height = input(320, { transform: numberAttribute });
    readonly options = input.required<InteractiveChartOption[]>();
    readonly onOptionSelected = output<string>();
    readonly additionalCssClass = input<string | null>(null);

    private readonly _selectedOptionId = signal<string | null>(null);

    /** OnInitialized do Blazor: pré-seleciona a primeira opção. */
    readonly selectedOptionId = computed<string | null>(
        () => this._selectedOptionId() ?? this.options()[0]?.id ?? null,
    );

    readonly cssClass = computed(() =>
        cssClasses('gns-interactive-chart', this.additionalCssClass()),
    );

    readonly selectedData = computed<ChartDataPoint[] | null>(() => {
        const id = this.selectedOptionId();
        if (id === null) return null;
        return this.options().find((o) => o.id === id)?.data ?? null;
    });

    /** Séries/labels derivadas para o GnsLineChart. */
    readonly lineSeries = computed<ChartSeries[]>(() => {
        const data = this.selectedData();
        if (!data) return [];
        return [{ name: this.title(), values: data.map((d) => d.value) }];
    });

    readonly lineLabels = computed<string[]>(() =>
        (this.selectedData() ?? []).map((d) => d.label),
    );

    readonly isBar = computed(() => this.chartType() === 'bar');
    readonly isLine = computed(() => this.chartType() === 'line');
    readonly isBubble = computed(() => this.chartType() === 'bubble');

    constructor() {
        const host = inject(ElementRef<HTMLElement>);
        const detach = attachChartInteractivity(host.nativeElement);
        inject(DestroyRef).onDestroy(detach);
    }

    selectOption(id: string): void {
        this._selectedOptionId.set(id);
        this.onOptionSelected.emit(id);
    }
}
