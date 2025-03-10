import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() version: 'filled' | 'outlined' | 'underlined' = 'filled';
  @Input() type: 'button' | 'submit' = 'button';
}
