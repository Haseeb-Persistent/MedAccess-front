import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements OnInit, OnDestroy {
  currentSlide = 0;
  private autoplayInterval: any;
  private isPaused = false;

  slides = [
    {
      title: 'Welcome to <span class="highlight">MedAccess</span>',
      description: 'Your trusted partner in fertility care.',
      image: '/assets/img/ezgif-85b26bd9a39b4114.gif'
    },
    {
      title: 'AI‑Assisted <span class="highlight">IVF</span>',
      description: 'Harness the power of artificial intelligence.',
      image: '/assets/img/TEAM2.jpeg'
    },
    {
      title: 'AI‑Assisted <span class="highlight">IVF</span>',
      description: 'Harness the power of artificial intelligence.',
      image: '/assets/img/TEAM1.jpeg'    }
  ];

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 5000);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  pauseAutoplay(): void {
    this.isPaused = true;
  }

  resumeAutoplay(): void {
    this.isPaused = false;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.pauseAutoplay();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.resumeAutoplay();
  }
}