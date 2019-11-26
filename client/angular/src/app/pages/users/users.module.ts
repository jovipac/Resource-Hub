import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
    declarations: [UsersComponent],
    imports: [CommonModule, SharedModule, UsersRoutingModule]
})
export class UsersModule {}
