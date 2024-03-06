import {Route} from '@angular/router'
import {provideEffects} from '@ngrx/effects'
import {provideState} from '@ngrx/store'
import * as editArticleEffects from './store/effects'
import { EditArticleComponent } from './components/edit-article/edit-article.component'
import { EditArticleService } from './services/edit-article.service'
import { editArticleFeatureKey, editArticleReducer } from './store/redusers'

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
