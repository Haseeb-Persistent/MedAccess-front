// services/aos.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Injectable({
  providedIn: 'root'
})
export class AosService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  initAOS(): void {
    if (this.isBrowser) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120,
        delay: 100,
        disable: 'mobile', // Disable on mobile devices
        startEvent: 'DOMContentLoaded',
        throttleDelay: 99,
        debounceDelay: 50
      });
    }
  }

  refreshAOS(): void {
    if (this.isBrowser) {
      AOS.refresh();
    }
  }

  // Remove destroyAOS() method - AOS doesn't have destroy
  // Or implement it as a no-op
  destroyAOS(): void {
    // AOS doesn't have a destroy method
    // This is a no-op for compatibility
    if (this.isBrowser) {
      // Just refresh as a fallback
      AOS.refresh();
    }
  }
}