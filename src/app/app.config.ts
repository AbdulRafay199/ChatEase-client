import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideAnimations(), provideHttpClient(), provideStore(reducers, { metaReducers })]
};
