import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingsStateInterface } from '../types/settingsState.interface';
import { authActions } from 'src/app/auth/store/actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const{
    name: settingsFeatureKey,
    reducer: settingsReducer,
    selectValidationErrors,
    selectIsSubmitting
} = settingsFeature;