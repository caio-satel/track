import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesComponent } from './page/page/releases.component';
import { ReleasesTableComponent } from './page/components/releases-table/releases-table.component';
import { ReleasesFormComponent } from './page/components/releases-form/releases-form.component';
import { RouterModule } from '@angular/router';
import { releasesRoutes } from './releases.routing';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ReleasesComponent,
    ReleasesTableComponent,
    ReleasesFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(releasesRoutes),
    // SharedModule
    SharedModule
  ]
})
export class ReleasesModule { }
