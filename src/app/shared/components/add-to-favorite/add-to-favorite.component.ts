import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddToFavoritesService } from './services/add-to-favorites.service';
import { Store } from '@ngrx/store';
import { addToFavoriteActions } from './store/actions';

@Component({
  selector: 'ngx-add-to-favorites',
  templateUrl: './add-to-favorite.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [AddToFavoritesService],
})
export class AddToFavoriteComponent {
  @Input() isFavorited: boolean = false
  @Input() favoritesCount: number = 0
  @Input() articleSlug: string = ''


  constructor(private store: Store){}

  handleLike() {
    this.store.dispatch(addToFavoriteActions.addToFavorite({
      isFavorite: this.isFavorited,
      slug: this.articleSlug
    }));  
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }
    this.isFavorited = !this.isFavorited;
  }
}
