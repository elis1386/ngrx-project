import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const addToFavoriteActions = createActionGroup({
  source: 'Add to favorite',
  events: {
    'Add to favorite': props<{ isFavorite: boolean; slug: string }>(),
    'Add to favorite success': props<{ article: ArticleInterface }>(),
    'Add to favorite failed': emptyProps(),
  },
});
