import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { LabGridComposition } from './gns-lab-grid-composition';
import { LabGridLayout } from './gns-lab-grid-layout';
import { LabGridStack } from './gns-lab-grid-stack';

@Component({
    selector: 'gns-lab-grid',
    templateUrl: './gns-lab-grid.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsPageHeader, LabGridLayout, LabGridStack, LabGridComposition],
})
export class LabGrid {}
