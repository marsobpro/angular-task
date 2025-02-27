import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ButtonComponent],
  imports: [MatButtonModule, CommonModule],
  exports: [ButtonComponent],
})
export class SharedModule {}
