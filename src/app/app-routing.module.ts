import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './components/authentication/login/login.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/authentication/authentication.module').then(module => module.AuthenticationModule) },
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./components/home/home.module').then(module => module.HomeModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
