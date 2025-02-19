import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesComponent } from './page/releases.component';
import { ReleasesTableComponent } from './components/releases-table/releases-table.component';
import { ReleasesFormComponent } from './components/releases-form/releases-form.component';
import { RouterModule } from '@angular/router';
import { releasesRoutes } from './releases.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ReleasesComponent,
    ReleasesTableComponent,
    ReleasesFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(releasesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    // SharedModule
    SharedModule
  ]
})
export class ReleasesModule { }
