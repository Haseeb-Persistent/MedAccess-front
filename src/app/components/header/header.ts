import { Component, OnInit, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  isHomePage = true;

  // Expose auth service to template
  get auth() {
    return this.authService;
  }

  ngOnInit(): void {
    this.initStickyHeader();
    
    // Check if current route is home page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomePage = event.url === '/' || event.url === '';
      this.updateHeaderBackground();
    });
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
      const checkbox = document.getElementById('check') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    }
  }

  // Check if route is active
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // Logout
  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }

  // Update header background based on scroll and page
  updateHeaderBackground(): void {
    const header = document.getElementById('ftco-navbar');
    if (header) {
      if (window.scrollY > 30 || !this.isHomePage) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  }

  // Sticky header with scroll effects
  @HostListener('window:scroll', [])
  initStickyHeader(): void {
    this.updateHeaderBackground();
  }

  // Close mobile menu on ESC
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
  }

  // Close mobile menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isMobileMenuOpen) {
      const target = event.target as HTMLElement;
      const nav = this.el.nativeElement.querySelector('nav ul');
      const toggler = this.el.nativeElement.querySelector('.checkbtn');
      if (nav && toggler) {
        if (!nav.contains(target) && !toggler.contains(target)) {
          this.closeMobileMenu();
        }
      }
    }
  }

  // On resize, if desktop, close mobile menu
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 891 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}