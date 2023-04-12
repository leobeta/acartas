import {AddEditCasesComponent} from "../add-edit-cases/add-edit-cases.component";
import {AddEditPatientComponent} from "../add-edit-patient/add-edit-patient.component";
import {AddEditScheduleComponent} from "../add-edit-schedule/add-edit-schedule.component";
import {AgendaComponent} from "../agenda/agenda.component";
import {CasesComponent} from "../cases/cases.component";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgModule} from "@angular/core";
import {PatientComponent} from "../patient/patient.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "src/app/share/share.module";
import {AddEditObservation} from "../add-edit-observation/add-edit-observation";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    HomeComponent,
    PatientComponent,
    NavbarComponent,
    AgendaComponent,
    CasesComponent,
    AddEditPatientComponent,
    AddEditScheduleComponent,
    AddEditCasesComponent,
    AddEditObservation,
    ConfirmationDialogComponent,
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
