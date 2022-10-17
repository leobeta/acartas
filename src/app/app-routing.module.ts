import { RouterModule, Routes } from '@angular/router';

import { AgendaComponent } from './components/agenda/agenda.component';
import { AuthGuard } from './core/auth.guard';
import { CasesComponent } from './components/cases/cases.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PatientComponent } from './components/patient/patient.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard] },
  { path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'cases', component: CasesComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
