import { Component, inject } from '@angular/core';
import { SearchResultsService } from '../search-results/search-results.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-video-details',
  standalone: false,
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent {
  videoId = '';
  videoDetails: any;
  private searchResultsService = inject(SearchResultsService);
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get('videoId') as string;
    this.searchResultsService
      .getVideoDetails([this.videoId])
      .subscribe((value: any) => {
        return (this.videoDetails = value.items[0]);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
