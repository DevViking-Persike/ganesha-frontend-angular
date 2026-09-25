import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { cssClasses } from '../chart-models';

@Component({
    selector: 'gns-sparkline',
    templateUrl: './gns-sparkline.html',
    styleUrls: ['./gns-sparkline.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsSparkline {
    readonly values = input.required<number[]>();
    readonly width = input(120, { transform: numberAttribute });
    readonly height = input(32, { transform: numberAttribute });
    readonly color = input('var(--gns-primary-500,#4F46E5)');
    readonly showArea = input(true);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses('gns-sparkline', this.additionalCssClass()),
    );

    readonly vm = computed(() => {
        const values = this.values();
        if (!values || values.length <= 1) return null;

        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;
        const padV = 2;
        const plotH = this.height() - padV * 2;
        const stepX = (this.width() - 2) / (values.length - 1);

        const yAt = (value: number) => padV + (range > 0 ? (1 - (value - min) / range) * plotH : plotH / 2);

        let path = '';
        for (let i = 0; i < values.length; i++) {
            const x = 1 + i * stepX;
            const y = yAt(values[i]);
            if (i === 0) {
                path += `M${x.toFixed(1)},${y.toFixed(1)}`;
            } else {
                const prevX = 1 + (i - 1) * stepX;
                const prevY = yAt(values[i - 1]);
                const cp1x = prevX + stepX * 0.5;
                const cp2x = x - stepX * 0.5;
                path += ` C${cp1x.toFixed(1)},${prevY.toFixed(1)} ${cp2x.toFixed(1)},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
            }
        }

        const firstX = 1;
        const lastX = 1 + (values.length - 1) * stepX;
        const bottom = this.height() - padV;
        const areaPath = `${path} L${lastX.toFixed(1)},${bottom.toFixed(1)} L${firstX.toFixed(1)},${bottom.toFixed(1)} Z`;

        return { path, areaPath };
    });
}
