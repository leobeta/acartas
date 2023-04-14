import { AgendaComponent } from "../agenda/agenda.component";
import { CasesComponent } from "../cases/cases.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { PatientComponent } from "../patient/patient.component";
import { RouterModule } from "@angular/router";
import { UsersComponent } from "../users/users.component";

const routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'agenda', component: AgendaComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'cases', component: CasesComponent },
      { path: 'users', component: UsersComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
