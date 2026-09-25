import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';

interface TypeSample {
    readonly label: string;
    readonly specs: string;
    readonly sizeVar: string;
    readonly weightVar: string;
    readonly leadingVar: string | null;
    readonly text: string;
}

const FOX = 'The quick brown fox jumps over the lazy dog';
const TOKENS_PARAGRAPH =
    'Design tokens are the visual design atoms of the system. They store values such as colors, ' +
    'typography, spacing, and more, allowing teams to maintain consistency across products and platforms.';

const HEADINGS: readonly TypeSample[] = [
    { label: 'H1', specs: '2.25rem / 36px &middot; Bold &middot; 1.25', sizeVar: '--gns-type-h1-size', weightVar: '--gns-type-h1-weight', leadingVar: '--gns-type-h1-leading', text: FOX },
    { label: 'H2', specs: '1.875rem / 30px &middot; Semibold &middot; 1.25', sizeVar: '--gns-type-h2-size', weightVar: '--gns-type-h2-weight', leadingVar: '--gns-type-h2-leading', text: FOX },
    { label: 'H3', specs: '1.5rem / 24px &middot; Semibold &middot; 1.375', sizeVar: '--gns-type-h3-size', weightVar: '--gns-type-h3-weight', leadingVar: '--gns-type-h3-leading', text: FOX },
    { label: 'H4', specs: '1.25rem / 20px &middot; Semibold &middot; 1.375', sizeVar: '--gns-type-h4-size', weightVar: '--gns-type-h4-weight', leadingVar: '--gns-type-h4-leading', text: FOX },
    { label: 'H5', specs: '1.125rem / 18px &middot; Semibold &middot; 1.375', sizeVar: '--gns-type-h5-size', weightVar: '--gns-type-h5-weight', leadingVar: '--gns-type-h5-leading', text: FOX },
    { label: 'H6', specs: '1rem / 16px &middot; Semibold &middot; 1.5', sizeVar: '--gns-type-h6-size', weightVar: '--gns-type-h6-weight', leadingVar: '--gns-type-h6-leading', text: FOX },
];

const BODY_SAMPLES: readonly TypeSample[] = [
    { label: 'Body Large', specs: '1.125rem / 18px &middot; Regular &middot; 1.625', sizeVar: '--gns-type-body-lg-size', weightVar: '--gns-type-body-lg-weight', leadingVar: '--gns-type-body-lg-leading', text: TOKENS_PARAGRAPH },
    { label: 'Body', specs: '1rem / 16px &middot; Regular &middot; 1.5', sizeVar: '--gns-type-body-size', weightVar: '--gns-type-body-weight', leadingVar: '--gns-type-body-leading', text: TOKENS_PARAGRAPH },
    { label: 'Body Small', specs: '0.875rem / 14px &middot; Regular &middot; 1.5', sizeVar: '--gns-type-body-sm-size', weightVar: '--gns-type-body-sm-weight', leadingVar: '--gns-type-body-sm-leading', text: TOKENS_PARAGRAPH },
];

const WEIGHTS: readonly { label: string; weightVar: string }[] = [
    { label: 'Regular 400', weightVar: '--gns-font-weight-regular' },
    { label: 'Medium 500', weightVar: '--gns-font-weight-medium' },
    { label: 'Semibold 600', weightVar: '--gns-font-weight-semibold' },
    { label: 'Bold 700', weightVar: '--gns-font-weight-bold' },
    { label: 'Extrabold 800', weightVar: '--gns-font-weight-extrabold' },
];

const FONT_SIZES: readonly { token: string; size: string }[] = [
    { token: '--gns-text-xs', size: '0.75rem / 12px' },
    { token: '--gns-text-sm', size: '0.875rem / 14px' },
    { token: '--gns-text-base', size: '1rem / 16px' },
    { token: '--gns-text-lg', size: '1.125rem / 18px' },
    { token: '--gns-text-xl', size: '1.25rem / 20px' },
    { token: '--gns-text-2xl', size: '1.5rem / 24px' },
    { token: '--gns-text-3xl', size: '1.875rem / 30px' },
    { token: '--gns-text-4xl', size: '2.25rem / 36px' },
    { token: '--gns-text-5xl', size: '3rem / 48px' },
    { token: '--gns-text-6xl', size: '3.75rem / 60px' },
];

@Component({
    selector: 'gns-lab-typography',
    templateUrl: './gns-lab-typography.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsPageHeader, GnsSection],
})
export class LabTypography {
    protected readonly headings = HEADINGS;
    protected readonly bodySamples = BODY_SAMPLES;
    protected readonly weights = WEIGHTS;
    protected readonly fontSizes = FONT_SIZES;
    protected readonly fox = FOX;
}
