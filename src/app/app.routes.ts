import { Routes } from '@angular/router';
import { SearchResultsComponent } from './youtube/components/search-results/search-results.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'results',
    loadChildren: () =>
      import('./youtube/youtube.module').then((m) => m.YoutubeModule),
  },
  { path: '**', component: NotFoundComponent },
];
