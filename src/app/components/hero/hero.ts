import { Component, OnInit, OnDestroy } from '@angular/core';
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
  autoplayInterval: any;
  totalSlides = 3;

  slides = [
    {
      id: 1,
      title: "Pakistan's 1st<br>AI Based Fertility Centre",
      description: 'Experience compassionate, AI-powered fertility care tailored to your journey. Advanced IVF, ICSI, IUI, and reproductive treatments under one roof. Helping you achieve the dream of parenthood with confidence and care.',
      VideoFrame: 'https://themedaccess.com/assets/video/IVF%20video-1.mp4',
    },
    {
      id: 2,
      title: 'We provide<br>High Quality Service',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Viverra maecenas accumsan lacus vel facilisis.',
            image: 'https://i.ibb.co/YFM8qX3x/curasol.jpg',

      bgColor: '#1a2a6c'
    },
    {
      id: 3,
      title: 'Our Working Process<br>is Unique',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Viverra maecenas accumsan lacus vel facilisis.',
      image: 'https://via.placeholder.com/1920x800/2a3a7c/ffffff?text=Slide+3',
      bgColor: '#2a3a7c'
    }
  ];

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  startAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoplay(): void {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoplay();
  }

  pauseAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }
}