import { AgendaComponent } from "../agenda/agenda.component";
import { CasesComponent } from "../cases/cases.component";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { PatientComponent } from "../patient/patient.component";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'agenda', component: AgendaComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'cases', component: CasesComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
