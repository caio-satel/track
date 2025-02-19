import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './page/tasks.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';
import { RouterModule } from '@angular/router';
import { tasksRoutes } from './tasks.routing';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TasksComponent,
    TasksTableComponent,
    TasksFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(tasksRoutes),
    // SharedModule
    SharedModule
  ]
})
export class TasksModule { }
