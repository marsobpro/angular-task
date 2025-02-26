import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./youtube/youtube.module').then((m) => m.YoutubeModule),
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./youtube/youtube.module').then((m) => m.YoutubeModule),
  },
  { path: '**', component: NotFoundComponent },
];
