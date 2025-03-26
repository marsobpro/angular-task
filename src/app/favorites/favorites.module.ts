import { NgModule } from '@angular/core';
import { FavoritesComponent } from './components/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [FavoritesRoutingModule],
  providers: [],
  exports: [FavoritesComponent],
})
export class FavoritesModule {}
