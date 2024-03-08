import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest, filter } from 'rxjs';
import { authActions } from 'src/app/auth/store/actions';
import {
  selectCurrentUser,
  selectIsSubmitting,
  selectValidationErrors,
} from 'src/app/auth/store/reducers';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { CurrentUserRequestInterface } from 'src/app/shared/types/currentUserRequest.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorMessages, ReactiveFormsModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  currentUser?: CurrentUserInterface;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  currentUserSubscription?: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm(currentUser);
      });
  }
  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
  initializeForm(currentUser: CurrentUserInterface) {
    if (!this.currentUser) {
      throw new Error('currentUser is not defined');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    });
  }
  submit(): void {
    console.log('submit', this.form.value);
    if (!this.currentUser) {
      throw new Error('currentUser is not defined');
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };
    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }));
   
  }
  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
