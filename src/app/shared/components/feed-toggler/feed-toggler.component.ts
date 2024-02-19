import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/reducers';

@Component({
  selector: 'ngx-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}
}
