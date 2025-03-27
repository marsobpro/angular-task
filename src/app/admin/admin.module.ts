import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
