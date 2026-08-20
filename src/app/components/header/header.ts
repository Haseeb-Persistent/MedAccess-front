import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private el = inject(ElementRef);

  isMobileMenuOpen = false;
  isDropdownOpen = false;

  // Expose auth service to template
  get auth() {
    return this.authService;
  }

  ngOnInit(): void {
    this.initStickyHeader();
  }

  // ==============================
  // MOBILE MENU
  // ==============================

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    this.updateBodyScroll();
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  private updateBodyScroll(): void {
    document.body.style.overflow =
      this.isMobileMenuOpen ? 'hidden' : '';
  }

  // ==============================
  // DROPDOWN
  // ==============================

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  // ==============================
  // ROUTING
  // ==============================

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // ==============================
  // LOGOUT
  // ==============================

  logout(): void {
    this.authService.logout();

    this.closeMobileMenu();
    this.closeDropdown();
  }

  // ==============================
  // STICKY HEADER
  // ==============================

  @HostListener('window:scroll')
  initStickyHeader(): void {

    const header =
      this.el.nativeElement.querySelector('#ftco-navbar');

    if (!header) {
      return;
    }

    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  // ==============================
  // ESCAPE KEY
  // ==============================

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
    this.closeDropdown();
  }

  // ==============================
  // OUTSIDE CLICK
  // ==============================

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {

    const target = event.target as HTMLElement;

    // Mobile menu
    if (this.isMobileMenuOpen) {

      const navbar =
        this.el.nativeElement.querySelector('.nav-menu');

      const toggler =
        this.el.nativeElement.querySelector('.checkbtn');

      if (
        navbar &&
        toggler &&
        !navbar.contains(target) &&
        !toggler.contains(target)
      ) {
        this.closeMobileMenu();
      }
    }

    // User dropdown
    if (this.isDropdownOpen) {

      const dropdown =
        this.el.nativeElement.querySelector('.user-dropdown');

      if (dropdown && !dropdown.contains(target)) {
        this.closeDropdown();
      }
    }
  }

  // ==============================
  // WINDOW RESIZE
  // ==============================

  @HostListener('window:resize')
  onResize(): void {

    if (window.innerWidth > 890) {
      this.closeMobileMenu();
    }
  }
} 