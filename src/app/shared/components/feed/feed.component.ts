import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { combineLatest } from 'rxjs';

import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';

import { environment } from 'src/environments/environment';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { IsLoadingComponent } from '../is-loading/is-loading.component';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
  selector: 'ngx-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    IsLoadingComponent,
    PaginationComponent,
    TagListComponent,
  ],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || 1);
      this.fetchFeed();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue
      if (isApiUrlChanged) {
        this.fetchFeed();
      }
  }
  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const strigifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${strigifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
