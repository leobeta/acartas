import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { NgModule } from '@angular/core';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ShareModule,
  ],
  providers: [
  ],
  exports: [
    LogoutComponent,
    LoginComponent,
  ]
})
export class AuthenticationModule { }
