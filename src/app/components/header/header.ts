import { Component, OnInit, HostListener, ElementRef, inject } from '@angular/core';
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

  // Expose auth service to template
  get auth() {
    return this.authService;
  }

  ngOnInit(): void {
    this.initStickyHeader();
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Close mobile menu
  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  // Check if route is active (for .active class)
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // Logout
  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }

  // Sticky header: white background on scroll
  @HostListener('window:scroll', [])
  initStickyHeader(): void {
    const header = document.getElementById('ftco-navbar');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  }

  // Close mobile menu on ESC
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
  }

  // Close mobile menu when clicking outside (on mobile)
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isMobileMenuOpen) {
      const target = event.target as HTMLElement;
      const navbar = this.el.nativeElement.querySelector('#ftco-nav');
      const toggler = this.el.nativeElement.querySelector('.navbar-toggler');
      if (navbar && toggler) {
        if (!navbar.contains(target) && !toggler.contains(target)) {
          this.closeMobileMenu();
        }
      }
    }
  }

  // On resize, if desktop, close mobile menu
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 992 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}