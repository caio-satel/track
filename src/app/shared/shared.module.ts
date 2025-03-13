import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersReportsComponent } from './users-reports/users-reports.component';
import { ProjectsReportsComponent } from './projects-reports/projects-reports.component';
import { TasksReportsComponent } from './tasks-reports/tasks-reports.component';
import { ReleasesReportsComponent } from './releases-reports/releases-reports.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ConfirmDialogComponent,
    ChangePasswordDialogComponent,
    UsersReportsComponent,
    ProjectsReportsComponent,
    TasksReportsComponent,
    ReleasesReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    ToolbarComponent,
    UsersReportsComponent,
    ConfirmDialogComponent,
    ProjectsReportsComponent,
    TasksReportsComponent,
    ReleasesReportsComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
