import { AddEditAgendaComponent } from "../add-edit-agenda/add-edit-agenda.component";
import { AddEditCasesComponent } from "../add-edit-cases/add-edit-cases.component";
import { AddEditObservation } from "../add-edit-observation/add-edit-observation";
import { AddEditPatientComponent } from "../add-edit-patient/add-edit-patient.component";
import { AgendaComponent } from "../agenda/agenda.component";
import { CasesComponent } from "../cases/cases.component";
import { CommonModule } from "@angular/common";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { NavbarComponent } from "../navbar/navbar.component";
import { NgModule } from "@angular/core";
import { PatientComponent } from "../patient/patient.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "../../share/share.module";
import { UsersComponent } from "../users/users.component";

@NgModule({
  declarations: [
    HomeComponent,
    PatientComponent,
    NavbarComponent,
    AgendaComponent,
    CasesComponent,
    AddEditPatientComponent,
    AddEditAgendaComponent,
    AddEditCasesComponent,
    AddEditObservation,
    ConfirmationDialogComponent,
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ShareModule,
  ],
  providers: [],
})
export class HomeModule { }
