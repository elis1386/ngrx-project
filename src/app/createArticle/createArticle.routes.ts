import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { CreateArticleComponent } from './components/create-article/create-article.component';
import { CreateArticleService } from './services/create-article.service';
import * as createArticleEffects from './store/effects';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/redusers';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
]
