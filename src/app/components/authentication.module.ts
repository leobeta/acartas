import { ShareModule } from './../share/share.module';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { LibraryConfig } from '../models/config';



@NgModule({
  declarations: [LoginComponent, LogoutComponent],
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
      providers: [{provide: 'config', useValue: config}]
    }
  }
}
