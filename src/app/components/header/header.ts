import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;
  isMobile = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initStickyHeader();
    this.checkScreenSize();
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.activeDropdown = null;
    }
  }

  // Close mobile menu
  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
      this.activeDropdown = null;
    }
  }

  // Toggle dropdown
  toggleDropdown(event: Event, name: string): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.isMobile) {
      this.activeDropdown = this.activeDropdown === name ? null : name;
    } else {
      // Desktop: use hover, but toggle if clicked
      this.activeDropdown = this.activeDropdown === name ? null : name;
    }
  }

  // Check screen size
  @HostListener('window:resize')
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 992;
    if (!this.isMobile && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Close mobile menu on ESC key
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && !target.closest('.navbar-toggler')) {
      this.activeDropdown = null;
    }
    
    // Close mobile menu when clicking outside
    if (this.isMobileMenuOpen) {
      const navbar = this.el.nativeElement.querySelector('#mainNavbar');
      const toggler = this.el.nativeElement.querySelector('.navbar-toggler');
      if (navbar && toggler) {
        if (!navbar.contains(target) && !toggler.contains(target)) {
          this.closeMobileMenu();
        }
      }
    }
  }

  // Sticky header on scroll
  @HostListener('window:scroll', [])
  initStickyHeader(): void {
    const header = document.getElementById('mainNavbarWrapper');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  }
}