import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard.component";
import { dashboardRoutes } from "./dashboard.routing";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(dashboardRoutes),
    //SharedModule
    SharedModule,
]
})
export class DashboardModule { }
