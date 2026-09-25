import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';

interface ColorSwatch {
    readonly step: string;
    readonly hex: string;
}

interface ColorScale {
    readonly name: string;
    readonly tokenPrefix: string;
    readonly showToken: boolean;
    readonly swatches: readonly ColorSwatch[];
}

interface SemanticToken {
    readonly token: string;
    readonly description: string;
}

const SCALE_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

function scale(name: string, tokenPrefix: string, hexes: readonly string[], showToken: boolean): ColorScale {
    return {
        name,
        tokenPrefix,
        showToken,
        swatches: SCALE_STEPS.map((step, i) => ({ step, hex: hexes[i] })),
    };
}

const PRIMARY = scale('Primary', '--gns-primary', [
    '#EEEEFF', '#E0E0FF', '#C6C4FF',
    '#A5A1FC', '#8178F8', '#6358F2',
    '#4F46E5', '#4238C8', '#3530A0',
    '#29277B', '#161550',
], true);

const GRAY = scale('Gray', '--gns-gray', [
    '#F8F9FB', '#F1F3F7', '#E4E7EF',
    '#CDD2E0', '#A8B0C4', '#7E8799',
    '#5C6478', '#434A5C', '#2C3142',
    '#1A1E2E', '#0F1118',
], true);

const SUCCESS = scale('Success', '--gns-success', [
    '#ECFDF5', '#D1FAE5', '#A7F3D0',
    '#6EE7B7', '#34D399', '#10B981',
    '#059669', '#047857', '#065F46',
    '#064E3B', '#022C22',
], false);

const WARNING = scale('Warning', '--gns-warning', [
    '#FFFBEB', '#FEF3C7', '#FDE68A',
    '#FCD34D', '#FBBF24', '#F59E0B',
    '#D97706', '#B45309', '#92400E',
    '#78350F', '#451A03',
], false);

const DANGER = scale('Danger', '--gns-danger', [
    '#FFF1F2', '#FFE4E6', '#FECDD3',
    '#FDA4AF', '#FB7185', '#F43F5E',
    '#E11D48', '#BE123C', '#9F1239',
    '#881337', '#4C0519',
], false);

const INFO = scale('Info', '--gns-info', [
    '#F0F9FF', '#E0F2FE', '#BAE6FD',
    '#7DD3FC', '#38BDF8', '#0EA5E9',
    '#0284C7', '#0369A1', '#075985',
    '#0C4A6E', '#082F49',
], false);

const SEMANTIC_TOKENS: readonly SemanticToken[] = [
    { token: '--gns-color-bg-page', description: 'Main page background' },
    { token: '--gns-color-bg-subtle', description: 'Subtle background for secondary areas' },
    { token: '--gns-color-bg-muted', description: 'Muted background for grouped content' },
    { token: '--gns-color-surface-default', description: 'Default card/panel surface' },
    { token: '--gns-color-surface-raised', description: 'Elevated surface (modals, popovers)' },
    { token: '--gns-color-surface-sunken', description: 'Recessed/inset surface' },
    { token: '--gns-color-text-primary', description: 'Primary text color' },
    { token: '--gns-color-text-secondary', description: 'Secondary/supporting text' },
    { token: '--gns-color-text-tertiary', description: 'Tertiary/caption text' },
    { token: '--gns-color-text-disabled', description: 'Disabled text' },
    { token: '--gns-color-text-link', description: 'Link text color' },
    { token: '--gns-color-border-default', description: 'Default border' },
    { token: '--gns-color-border-subtle', description: 'Subtle/light border' },
    { token: '--gns-color-border-strong', description: 'Emphasized border' },
    { token: '--gns-color-border-focus', description: 'Focus ring border' },
];

@Component({
    selector: 'gns-lab-colors',
    templateUrl: './gns-lab-colors.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsPageHeader, GnsSection],
})
export class LabColors {
    protected readonly primaryScale = PRIMARY;
    protected readonly grayScale = GRAY;
    protected readonly semanticScales: readonly ColorScale[] = [SUCCESS, WARNING, DANGER, INFO];
    protected readonly semanticTokens = SEMANTIC_TOKENS;
}
