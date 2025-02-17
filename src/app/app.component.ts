import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@Component({
  selector: 'app-root',
  imports: [
    MatSlideToggleModule,
    NavbarComponent,
    NavbarComponent,
    SearchResultsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'youtube-app';
}
