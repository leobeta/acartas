import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AddPatientComponent } from './add-patient/add-patient.component';
import { AgendaComponent } from './agenda/agenda.component';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LibraryConfig } from '../models/config';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PatientComponent } from './patient/patient.component';
import { ShareModule } from './../share/share.module';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AddEditScheduleComponent } from './add-edit-schedule/add-edit-schedule.component';
import { CasesComponent } from './cases/cases.component';
import { AddEditCasesComponent } from './add-edit-cases/add-edit-cases.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent, AgendaComponent, PatientComponent, AddPatientComponent, AddEditScheduleComponent, CasesComponent, AddEditCasesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    LogoutComponent,
    LoginComponent,
  ]
})
export class AuthenticationModule {
  static forRoot(config: LibraryConfig): ModuleWithProviders<AuthenticationModule> {
    return {
      ngModule: AuthenticationModule,
      providers: [{ provide: 'config', useValue: config }]
    }
  }
}
