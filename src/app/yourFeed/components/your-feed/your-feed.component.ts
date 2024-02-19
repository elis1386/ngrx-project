import { Component } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'ngx-your-feed',
  templateUrl: './your-feed.component.html',
  standalone: true,
  imports: [FeedComponent,BannerComponent, PopularTagsComponent, FeedTogglerComponent],
})
export class YourFeedComponent {
  apiUrl: string = '/articles/feed';
}
