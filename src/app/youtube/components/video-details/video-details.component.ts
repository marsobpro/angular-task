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
    this.videoDetails = this.searchResultsService.getVideo(this.videoId);
    console.log('Video details', this.videoDetails);
  }

  goBack(): void {
    this.location.back();
  }
}
