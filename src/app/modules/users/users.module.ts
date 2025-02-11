import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './page/users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { SharedModule } from "../../shared/shared.module";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routing';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSortModule,
    //SharedModule para compartilhar componentes
    SharedModule
]
})
export class UsersModule { }
