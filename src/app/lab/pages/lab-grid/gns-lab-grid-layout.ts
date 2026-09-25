import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsGrid } from '../../../design-system/layout/gns-grid/gns-grid';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { boxStyle } from './lab-grid-style';

interface GridDemo {
    readonly label: string;
    readonly columns: number;
    readonly boxes: readonly string[];
    readonly boxLabel: string;
    readonly color: string;
    readonly height: string;
}

function boxesOf(count: number): readonly string[] {
    return Array.from({ length: count }, (_, i) => String(i));
}

interface TemplateDemo {
    readonly label: string;
    readonly template: string | null;
    readonly gap: string;
    readonly boxes: readonly { text: string; color: string; height: string }[];
}

const GRID_DEMOS: readonly GridDemo[] = [
    { label: 'Columns="12" — each box spans 1 col', columns: 12, boxes: boxesOf(12), boxLabel: '1', color: 'var(--gns-primary-500)', height: '4rem' },
    { label: 'Columns="6" — each box spans 2 effective cols', columns: 6, boxes: boxesOf(6), boxLabel: '2', color: 'var(--gns-primary-400)', height: '4rem' },
    { label: 'Columns="4" — each box spans 3 effective cols', columns: 4, boxes: boxesOf(4), boxLabel: '3', color: 'var(--gns-primary-300)', height: '5rem' },
    { label: 'Columns="3" — each box spans 4 effective cols', columns: 3, boxes: boxesOf(3), boxLabel: '4', color: 'var(--gns-info-500)', height: '5rem' },
    { label: 'Columns="2" — each box spans 6 effective cols', columns: 2, boxes: boxesOf(2), boxLabel: '6', color: 'var(--gns-success-500)', height: '5rem' },
    { label: 'Columns="1" — full width, spans 12 effective cols', columns: 1, boxes: boxesOf(1), boxLabel: '12', color: 'var(--gns-warning-500)', height: '5rem' },
];

const TEMPLATE_DEMOS: readonly TemplateDemo[] = [
    {
        label: 'TemplateColumns="280px 1fr" — Sidebar + Content',
        template: '280px 1fr',
        gap: '4',
        boxes: [
            { text: '280px sidebar', color: 'var(--gns-primary-500)', height: '6rem' },
            { text: '1fr content area', color: 'var(--gns-primary-300)', height: '6rem' },
        ],
    },
    {
        label: 'TemplateColumns="1fr 300px" — Content + Sidebar',
        template: '1fr 300px',
        gap: '4',
        boxes: [
            { text: '1fr content area', color: 'var(--gns-info-500)', height: '6rem' },
            { text: '300px sidebar', color: 'var(--gns-primary-500)', height: '6rem' },
        ],
    },
    {
        label: 'TemplateColumns="200px 1fr 200px" — Holy Grail (left · main · right)',
        template: '200px 1fr 200px',
        gap: '4',
        boxes: [
            { text: '200px left', color: 'var(--gns-primary-500)', height: '6rem' },
            { text: '1fr main', color: 'var(--gns-success-500)', height: '6rem' },
            { text: '200px right', color: 'var(--gns-primary-500)', height: '6rem' },
        ],
    },
    {
        label: 'TemplateColumns="2fr 1fr" — Dashboard (2/3 + 1/3)',
        template: '2fr 1fr',
        gap: '4',
        boxes: [
            { text: '2fr main panel', color: 'var(--gns-warning-500)', height: '6rem' },
            { text: '1fr side panel', color: 'var(--gns-danger-500)', height: '6rem' },
        ],
    },
    {
        label: 'Columns="3" Gap="6" — Equal thirds with wide gap',
        template: null,
        gap: '6',
        boxes: [
            { text: '1fr', color: 'var(--gns-primary-400)', height: '6rem' },
            { text: '1fr', color: 'var(--gns-primary-400)', height: '6rem' },
            { text: '1fr', color: 'var(--gns-primary-400)', height: '6rem' },
        ],
    },
];

@Component({
    selector: 'gns-lab-grid-layout',
    templateUrl: './gns-lab-grid-layout.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsGrid, GnsSection],
})
export class LabGridLayout {
    protected readonly gridDemos = GRID_DEMOS;
    protected readonly templateDemos = TEMPLATE_DEMOS;

    protected boxStyle(color: string, height: string): string {
        return boxStyle(color, height);
    }
}
