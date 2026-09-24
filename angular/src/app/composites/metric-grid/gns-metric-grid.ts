import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    numberAttribute,
} from '@angular/core';
import { cssClasses } from '../../design-system/charts/chart-models';

/**
 * GnsMetricGrid — grid responsiva de metric cards via projeção de conteúdo.
 */
@Component({
    selector: 'gns-metric-grid',
    templateUrl: './gns-metric-grid.html',
    styleUrls: ['./gns-metric-grid.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsMetricGrid {
    /** Número de colunas em viewports grandes (default 4). */
    readonly columns = input(4, { transform: numberAttribute });
    readonly additionalCssClass = input<string | null>(null);

    private readonly hasModifier = computed(
        () => this.columns() >= 1 && this.columns() <= 6,
    );

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-metric-grid',
            this.hasModifier() && `gns-metric-grid--cols-${this.columns()}`,
            this.additionalCssClass(),
        ),
    );

    /** Fallback inline quando Columns está fora do conjunto 1–6. */
    readonly inlineColumns = computed<string | null>(() =>
        this.hasModifier() ? null : this.columns().toString(),
    );
}
