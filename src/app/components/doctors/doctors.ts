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
  slidesPerView = 1; // CHANGED: Always 1 doctor at a time
  totalSlides = 0;
  maxSlides = 0;
  autoplayInterval: any;

  doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      designation: 'Senior Fertility Specialist',
      image: 'assets/img/doctor 1.png',
      description: 'Over 15 years of experience in fertility treatments with a focus on personalized patient care.'
    },
    {
      id: 2,
      name: 'Dr. Marry',
      designation: 'Clinical Embryologist',
      image: 'assets/img/doctor 2.png',
      description: 'Expert in embryo culture and selection with advanced laboratory techniques.'
    },
    {
      id: 3,
      name: 'Dr. James',
      designation: 'IVF Consultant',
      image: 'assets/img/doctor 3.png',
      description: 'Specialized in complex IVF cases and recurrent implantation failure.'
    }
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
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
    // No need to change slidesPerView. Always 1.
    this.updateSliderPosition();
  }

  getSlideWidth(): number {
    const container = this.el.nativeElement.querySelector('.slide-container');
    if (container) {
      // Adjusted for 1 card view
      const containerWidth = container.offsetWidth - 80; 
      return containerWidth;
    }
    return 400;
  }

  getTransformValue(): string {
    const slideWidth = this.getSlideWidth();
    const gap = 30; // Gap between cards (though invisible since we only show 1)
    const translateX = -this.currentSlide * (slideWidth + gap);
    return `translateX(${translateX}px)`;
  }

  updateSliderPosition(): void {
    const wrapper = this.el.nativeElement.querySelector('.card-wrapper');
    if (wrapper) {
      wrapper.style.transform = this.getTransformValue();
      wrapper.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    this.updateDots();
  }

  nextSlide(): void {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop back to the first doctor
    }
    this.updateSliderPosition();
    this.resetAutoplay();
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.maxSlides; // Loop to the last doctor
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
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  resetAutoplay(): void {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  pauseAutoplay(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
  }
}