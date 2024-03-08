import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import { AddToFavoritesService } from '../services/add-to-favorites.service'
import { addToFavoriteActions } from './actions'
import { ArticleInterface } from 'src/app/shared/types/article.interface'

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), addToFavoritesService = inject(AddToFavoritesService)) => {
    return actions$.pipe(
      ofType(addToFavoriteActions.addToFavorite),
     
      switchMap(({isFavorite, slug}) => {
        const article$ = isFavorite ? addToFavoritesService.removeFromFavorites(slug) : addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoriteActions.addToFavoriteSuccess({article})
          }),
          catchError(() => {
            return of(addToFavoriteActions.addToFavoriteFailed())
          })
        )
      })
    )
  },
  {functional: true}
)
