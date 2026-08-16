// blog.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  
  currentSlide = 0;
  private autoplayInterval: any;
  private isPaused = false;

  // Blog data organized into slides (3 blogs per slide)
  blogSlides = [
    [
      {
        id: 1,
        title: 'All You Need to Know About Renting a Car in North Karachi',
        description: 'North Karachi, or New Karachi, is home to millions of Karachiites. With such a well-developed infrastructure, it is no wonder that Karachi is one of the most beautiful cities in the world. Renting a car here gives you the freedom to explore every corner.',
        author: 'Admin',
        category: 'Travel Guide',
        comments: 24,
        date: new Date(2026, 1, 14),
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 2,
        title: 'Want to Rent a Car in Clifton Karachi? Follow These Tips',
        description: 'Clifton is one of the most beautiful areas of Karachi. With its stunning beach views and vibrant dining scene, renting a car is the best way to explore. From luxury sedans to budget-friendly options, we have it all.',
        author: 'Admin',
        category: 'Travel Tips',
        comments: 18,
        date: new Date(2026, 0, 16),
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 3,
        title: 'Why You Should Be Renting a Corolla for a Day Trip',
        description: 'Karachi is one of the most populated cities in Pakistan. In terms of travel, the local transport system is efficient and reliable, but nothing beats the comfort and convenience of renting your own vehicle for a day trip.',
        author: 'Admin',
        category: 'Car Reviews',
        comments: 32,
        date: new Date(2026, 0, 15),
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      }
    ],
    [
      {
        id: 4,
        title: 'Top 5 Luxury Cars to Rent in Dubai for an Unforgettable Experience',
        description: 'Dubai is known for its luxurious lifestyle and stunning architecture. Renting a luxury car can elevate your experience. From Ferrari to Lamborghini, discover the best options for your next trip.',
        author: 'Admin',
        category: 'Luxury Cars',
        comments: 45,
        date: new Date(2026, 1, 10),
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 5,
        title: 'Essential Tips for First-Time Car Renters in Islamabad',
        description: 'Islamabad, the capital city of Pakistan, is known for its greenery and peaceful environment. If you\'re renting a car here for the first time, here are essential tips to ensure a smooth experience.',
        author: 'Admin',
        category: 'Beginner Guide',
        comments: 14,
        date: new Date(2026, 1, 8),
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 6,
        title: 'Best Road Trips to Take with a Rental Car in Pakistan',
        description: 'Pakistan offers some of the most breathtaking road trip destinations. From the northern areas to the southern coastal regions, discover the best routes to explore with a rental car.',
        author: 'Admin',
        category: 'Road Trips',
        comments: 28,
        date: new Date(2026, 1, 5),
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      }
    ],
    [
      {
        id: 7,
        title: 'How to Choose the Perfect SUV for Family Vacations',
        description: 'Planning a family vacation? An SUV is the perfect choice for comfort and space. Learn how to choose the right SUV for your family needs and make your trip memorable.',
        author: 'Admin',
        category: 'Family Travel',
        comments: 19,
        date: new Date(2026, 0, 28),
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 8,
        title: 'The Future of Car Rentals: Electric Vehicles Are Here',
        description: 'Electric vehicles are revolutionizing the car rental industry. Discover the benefits of renting an EV, from cost savings to environmental impact, and why you should consider it.',
        author: 'Admin',
        category: 'EV Trends',
        comments: 36,
        date: new Date(2026, 0, 22),
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 9,
        title: '5 Common Mistakes to Avoid When Renting a Car',
        description: 'Renting a car can be tricky if you\'re not careful. From hidden fees to insurance coverage, avoid these common mistakes to save money and enjoy a hassle-free rental experience.',
        author: 'Admin',
        category: 'Tips & Tricks',
        comments: 41,
        date: new Date(2026, 0, 18),
        image: 'https://images.unsplash.com/photo-1578844251758-2f71da64d6f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      }
    ]
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
    this.currentSlide = (this.currentSlide + 1) % this.blogSlides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.blogSlides.length) % this.blogSlides.length;
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