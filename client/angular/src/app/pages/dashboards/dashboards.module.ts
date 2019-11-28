import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { DashboardsRoutingModule } from './dashboards-routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, DashboardsRoutingModule]
})
export class DashboardsModule {}
