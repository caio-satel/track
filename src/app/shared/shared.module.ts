import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedModule { }
