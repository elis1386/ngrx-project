import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/globalFeed/globalFeeds.routes').then((m) => m.routes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('src/app/yourFeed/yourFeeds.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/tagFeed/tag-feed.routes').then((m) => m.routes),
  },
];
