import { Routes } from '@angular/router';
import { SearchResultsComponent } from './youtube/components/search-results/search-results.component';

export const routes: Routes = [
  {
    path: 'results',
    loadChildren: () =>
      import('./youtube/youtube.module').then((m) => m.YoutubeModule),
  },
  // { path: 'results', component: SearchResultsComponent },
];
