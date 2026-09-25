import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';

interface SpacingToken {
    readonly name: string;
    readonly rem: string;
    readonly px: number;
}

const SPACING_TOKENS: readonly SpacingToken[] = [
    { name: '0', rem: '0rem', px: 0 },
    { name: 'px', rem: '0.0625rem', px: 1 },
    { name: '0-5', rem: '0.125rem', px: 2 },
    { name: '1', rem: '0.25rem', px: 4 },
    { name: '1-5', rem: '0.375rem', px: 6 },
    { name: '2', rem: '0.5rem', px: 8 },
    { name: '2-5', rem: '0.625rem', px: 10 },
    { name: '3', rem: '0.75rem', px: 12 },
    { name: '3-5', rem: '0.875rem', px: 14 },
    { name: '4', rem: '1rem', px: 16 },
    { name: '5', rem: '1.25rem', px: 20 },
    { name: '6', rem: '1.5rem', px: 24 },
    { name: '7', rem: '1.75rem', px: 28 },
    { name: '8', rem: '2rem', px: 32 },
    { name: '9', rem: '2.25rem', px: 36 },
    { name: '10', rem: '2.5rem', px: 40 },
    { name: '11', rem: '2.75rem', px: 44 },
    { name: '12', rem: '3rem', px: 48 },
    { name: '14', rem: '3.5rem', px: 56 },
    { name: '16', rem: '4rem', px: 64 },
    { name: '20', rem: '5rem', px: 80 },
    { name: '24', rem: '6rem', px: 96 },
];

const VISUAL_NAMES = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16'];

@Component({
    selector: 'gns-lab-spacing',
    templateUrl: './gns-lab-spacing.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsPageHeader, GnsSection],
})
export class LabSpacing {
    protected readonly spacingTokens = SPACING_TOKENS;
    protected readonly visualTokens: readonly SpacingToken[] = SPACING_TOKENS.filter(
        (token) => VISUAL_NAMES.includes(token.name),
    );
}
