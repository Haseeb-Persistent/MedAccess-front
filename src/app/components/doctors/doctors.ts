import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctors.html',
  styleUrls: ['./doctors.css']
})
export class Doctors implements OnInit, OnDestroy {
  currentSlide = 0;
  slidesPerView = 3;
  totalSlides = 0;
  maxSlides = 0;
  autoplayInterval: any;

  doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      designation: 'Senior Fertility Specialist',
      image: 'https://via.placeholder.com/300x300/4070F4/ffffff?text=Dr.+Smith',
      description: 'Over 15 years of experience in fertility treatments with a focus on personalized patient care.'
    },
    {
      id: 2,
      name: 'Dr. Marry',
      designation: 'Clinical Embryologist',
      image: 'https://via.placeholder.com/300x300/1a2a6c/ffffff?text=Dr.+Marry',
      description: 'Expert in embryo culture and selection with advanced laboratory techniques.'
    },
    {
      id: 3,
      name: 'Dr. James',
      designation: 'IVF Consultant',
      image: 'https://via.placeholder.com/300x300/2a3a7c/ffffff?text=Dr.+James',
      description: 'Specialized in complex IVF cases and recurrent implantation failure.'
    },
    {
      id: 4,
      name: 'Eve',
      designation: 'Patient Care Coordinator',
      image: 'https://via.placeholder.com/300x300/3a4a8c/ffffff?text=Eve',
      description: 'Dedicated to providing compassionate support throughout your fertility journey.'
    },
    {
      id: 5,
      name: 'Dr. Sarah',
      designation: 'Reproductive Endocrinologist',
      image: 'https://via.placeholder.com/300x300/4a5a9c/ffffff?text=Dr.+Sarah',
      description: 'Expert in hormonal treatments and reproductive medicine.'
    },
    {
      id: 6,
      name: 'Dr. David',
      designation: 'Andrologist',
      image: 'https://via.placeholder.com/300x300/5a6aac/ffffff?text=Dr.+David',
      description: 'Specialized in male fertility and reproductive health.'
    },
    {
      id: 7,
      name: 'Dr. Emily',
      designation: 'Genetic Counselor',
      image: 'https://via.placeholder.com/300x300/6a7abc/ffffff?text=Dr.+Emily',
      description: 'Provides genetic counseling and screening for fertility patients.'
    },
    {
      id: 8,
      name: 'Dr. Michael',
      designation: 'Reproductive Surgeon',
      image: 'https://via.placeholder.com/300x300/7a8acc/ffffff?text=Dr.+Michael',
      description: 'Specialized in minimally invasive reproductive surgery.'
    }
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.updateSlidesPerView();
    this.totalSlides = this.doctors.length;
    this.maxSlides = this.totalSlides - this.slidesPerView;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateSliderPosition();
      this.startAutoplay();
    }, 100);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSlidesPerView();
    this.maxSlides = this.totalSlides - this.slidesPerView;
    if (this.currentSlide > this.maxSlides) {
      this.currentSlide = Math.max(0, this.maxSlides);
    }
    this.updateSliderPosition();
  }

  updateSlidesPerView(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.slidesPerView = 1;
    } else {
      this.slidesPerView = 3;
    }
    this.maxSlides = this.totalSlides - this.slidesPerView;
  }

  getSlideWidth(): number {
    const container = this.el.nativeElement.querySelector('.slide-container');
    if (container) {
      const containerWidth = container.offsetWidth - 80;
      const gap = 30;
      return (containerWidth - (this.slidesPerView - 1) * gap) / this.slidesPerView;
    }
    return 300;
  }

  getTransformValue(): string {
    const slideWidth = this.getSlideWidth();
    const gap = 30;
    const translateX = -this.currentSlide * (slideWidth + gap);
    return `translateX(${translateX}px)`;
  }

  updateSliderPosition(): void {
    const wrapper = this.el.nativeElement.querySelector('.card-wrapper');
    if (wrapper) {
      wrapper.style.transform = this.getTransformValue();
      wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    this.updateDots();
  }

  nextSlide(): void {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.updateSliderPosition();
    this.resetAutoplay();
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.maxSlides;
    }
    this.updateSliderPosition();
    this.resetAutoplay();
  }

  goToSlide(index: number): void {
    this.currentSlide = Math.min(index, this.maxSlides);
    this.updateSliderPosition();
    this.resetAutoplay();
  }

  updateDots(): void {
    const dots = this.el.nativeElement.querySelectorAll('.custom-dot');
    dots.forEach((dot: HTMLElement, index: number) => {
      if (index === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // ===== AUTO PLAY =====
  startAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  resetAutoplay(): void {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  pauseAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}