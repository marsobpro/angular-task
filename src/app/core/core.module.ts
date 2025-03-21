import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    SharedModule,
    RouterLink,
  ],
  exports: [NavbarComponent],
})
export class CoreModule {}
