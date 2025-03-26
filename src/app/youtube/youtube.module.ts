import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FilteringCriteriaComponent } from './components/filtering-criteria/filtering-criteria.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { UploadAgeDirective } from './directives/upload-age-directive/upload-age.directive';
import { FormsModule } from '@angular/forms';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { provideHttpClient } from '@angular/common/http';
import { SortResultsPipe } from './pipes/sort-results.pipe';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { EffectsModule } from '@ngrx/effects';
import { CustomCardEffect } from '../store/card/custom-card.effects';

@NgModule({
  declarations: [
    SearchResultsComponent,
    FilteringCriteriaComponent,
    VideoDetailsComponent,
    VideoCardComponent,
  ],
  imports: [
    YoutubeRoutingModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    SharedModule,
    FormsModule,
    NgOptimizedImage,
    UploadAgeDirective,
    SortResultsPipe,
    EffectsModule.forFeature([CustomCardEffect]),
  ],
  providers: [CustomCardEffect],
  exports: [
    SearchResultsComponent,
    FilteringCriteriaComponent,
    VideoCardComponent,
  ],
})
export class YoutubeModule {}
