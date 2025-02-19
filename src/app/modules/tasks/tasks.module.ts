import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './page/tasks.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';
import { RouterModule } from '@angular/router';
import { tasksRoutes } from './tasks.routing';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDateRangeInput } from '@angular/material/datepicker';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    TasksComponent,
    TasksTableComponent,
    TasksFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(tasksRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDateRangeInput,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    // SharedModule
    SharedModule
  ]
})
export class TasksModule { }
