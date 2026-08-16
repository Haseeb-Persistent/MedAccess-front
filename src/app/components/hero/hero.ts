/* hero.component.ts - Merged Hero + Search */
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements OnInit, OnDestroy {
  currentSlide = 0;
  private autoplayInterval: any;
  private isPaused = false;

  // Search Data
  searchData = {
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    sameLocation: true
  };

  slides = [
    {
      title: 'Fast & Easy Way <br>To <span class="highlight">Rent A Car</span>',
      description: 'A small river named Dudan flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    },
    {
      title: 'Better Way to Rent <br>Your <span class="highlight">Perfect Cars</span>',
      description: 'Choose from our wide selection of vehicles. From budget to luxury, we have the perfect car for your journey.',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    },
    {
      title: 'Make Your Trip <br><span class="highlight">Unforgettable</span>',
      description: 'Experience the joy of driving with our premium car rental service. Book now and enjoy the ride!',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    }
  ];

  ngOnInit(): void {
    this.startAutoplay();
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.searchData.pickupDate = today.toISOString().split('T')[0];
    this.searchData.dropoffDate = tomorrow.toISOString().split('T')[0];
    this.searchData.pickupTime = '10:00';
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

  // Search Handler
  onSearch(): void {
    console.log('Search Data:', this.searchData);
    // Navigate to results or process search
    // this.router.navigate(['/vehicles'], { queryParams: this.searchData });
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