import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';

@NgModule({
    declarations: [RoleComponent],
    imports: [CommonModule, SharedModule, RoleRoutingModule]
})
export class RoleModule {}
