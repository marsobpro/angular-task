import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [LoginComponent, AdminComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatLabel,
    MatFormField,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent, AdminComponent],
})
export class AuthModule {}
