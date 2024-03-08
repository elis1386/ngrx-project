import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { provideState } from '@ngrx/store';
import { settingsFeatureKey, settingsReducer } from './store/reducers';

export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  },
];
