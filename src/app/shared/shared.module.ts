import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ButtonComponent],
  imports: [MatButtonModule],
  exports: [ButtonComponent],
})
export class SharedModule {}
