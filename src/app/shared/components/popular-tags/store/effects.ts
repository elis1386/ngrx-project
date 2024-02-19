import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PopularTagService } from '../services/popular-tag.service';
import { popularTagsActions } from './actions';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

export const getPopularTags = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService)
) => {
    return actions$.pipe(
        ofType(popularTagsActions.getPopularTags),
        switchMap(() => {
            return popularTagsService.getPopularTags().pipe(
                map((popularTags: PopularTagType[]) => {
                    return popularTagsActions.getPopularTagsSuccess({ popularTags });
                }),
                catchError(() => {
                    return of(popularTagsActions.getPopularTagsFailure());
                })
            );
        })
    );
},
  { functional: true }
);
