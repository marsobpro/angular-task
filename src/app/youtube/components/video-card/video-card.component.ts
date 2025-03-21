import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
  standalone: false,
})
export class VideoCardComponent {
  @Input() video: any;
}
