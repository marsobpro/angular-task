import { NgModule } from '@angular/core';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FilteringCriteriaComponent } from './components/filtering-criteria/filtering-criteria.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { UploadAgeDirective } from './directives/upload-age-directive/upload-age.directive';
import { FormsModule } from '@angular/forms';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [SearchResultsComponent, FilteringCriteriaComponent],
  imports: [
    YoutubeRoutingModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    SharedModule,
    FormsModule,
    UploadAgeDirective,
  ],
  exports: [SearchResultsComponent, FilteringCriteriaComponent],
})
export class YoutubeModule {}
