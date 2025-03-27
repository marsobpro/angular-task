import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './components/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { YoutubeModule } from '../youtube/youtube.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [FavoritesRoutingModule, CommonModule, YoutubeModule],
  exports: [FavoritesComponent],
})
export class FavoritesModule {}
