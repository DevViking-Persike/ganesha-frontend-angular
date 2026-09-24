import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsStack } from '../../../design-system/layout/gns-stack/gns-stack';
import type { ContentAlignment } from '../../../design-system/layout/gns-stack/gns-stack';
import { boxStyle } from './lab-grid-style';

interface AlignDemo {
    readonly label: string;
    readonly align: ContentAlignment;
    readonly color: string;
}

const ALIGN_DEMOS: readonly AlignDemo[] = [
    { label: 'Align=Start', align: 'start', color: 'var(--gns-primary-500)' },
    { label: 'Align=Center', align: 'center', color: 'var(--gns-info-500)' },
    { label: 'Align=End', align: 'end', color: 'var(--gns-success-500)' },
    { label: 'Align=SpaceBetween', align: 'space-between', color: 'var(--gns-warning-500)' },
];

const WRAP_LABELS: readonly string[] = [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta',
    'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi',
];

@Component({
    selector: 'gns-lab-grid-stack',
    templateUrl: './gns-lab-grid-stack.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsSection, GnsStack],
})
export class LabGridStack {
    protected readonly alignDemos = ALIGN_DEMOS;
    protected readonly wrapLabels = WRAP_LABELS;

    protected boxStyle(color: string, height = '4rem', extra = ''): string {
        return boxStyle(color, height, extra);
    }
}
