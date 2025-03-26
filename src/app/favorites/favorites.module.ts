import { NgModule } from '@angular/core';
import { FavoritesComponent } from './components/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { CommonModule } from '@angular/common';
import { YoutubeModule } from '../youtube/youtube.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [FavoritesRoutingModule, CommonModule, YoutubeModule],
  providers: [],
  exports: [FavoritesComponent],
})
export class FavoritesModule {}
