// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

// Import Zone.js first
import 'zone.js'; // <-- ADD THIS AT THE TOP
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));