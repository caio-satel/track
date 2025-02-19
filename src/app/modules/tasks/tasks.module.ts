import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './page/tasks.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';



@NgModule({
  declarations: [
    TasksComponent,
    TasksTableComponent,
    TasksFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
