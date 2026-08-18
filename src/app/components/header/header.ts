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
  isDropdownOpen = false;

  // Expose auth service to template
  get auth() {
    return this.authService;
  }

  ngOnInit(): void {
    this.initStickyHeader();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
    this.closeDropdown();
  }

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

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close mobile menu
    if (this.isMobileMenuOpen) {
      const target = event.target as HTMLElement;
      const navbar = this.el.nativeElement.querySelector('ul');
      const toggler = this.el.nativeElement.querySelector('.checkbtn');
      if (navbar && toggler) {
        if (!navbar.contains(target) && !toggler.contains(target)) {
          this.closeMobileMenu();
        }
      }
    }

    // Close dropdown
    if (this.isDropdownOpen) {
      const target = event.target as HTMLElement;
      const dropdown = this.el.nativeElement.querySelector('.user-dropdown');
      if (dropdown && !dropdown.contains(target)) {
        this.closeDropdown();
      }
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 992 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}