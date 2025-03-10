import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './page/project.component';
import { RouterModule } from '@angular/router';
import { projectsRoutes } from './projects.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectsFormComponent } from './components/projects-form/projects-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsTableComponent,
    ProjectsFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(projectsRoutes),
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    // SharedModule
    SharedModule
  ]
})
export class ProjectsModule { }
