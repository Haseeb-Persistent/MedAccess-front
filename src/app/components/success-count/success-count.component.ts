import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-success-count',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './success-count.component.html',
  styleUrls: ['./success-count.component.css']
})
export class SuccessCountComponent implements OnInit, AfterViewInit {
  
  @ViewChildren('counter') counters!: QueryList<ElementRef>;

  // Statistics Data
  stats = [
    { value: 1250, label: 'Successful Births', suffix: '+', displayValue: '0' },
    { value: 98, label: 'Success Rate', suffix: '%', displayValue: '0' },
    { value: 3500, label: 'Happy Families', suffix: '+', displayValue: '0' },
    { value: 15, label: 'Years of Experience', suffix: '+', displayValue: '0' }
  ];

  // People Data
  people = [
    { name: 'Ali', image: 'https://i.ibb.co/bjMWyYZz/ali.png' },
    { name: 'Sara', image: 'https://i.ibb.co/bjMWyYZz/ali.png' },
    { name: 'Hassan', image: 'https://via.placeholder.com/150x150/2a3a7c/ffffff?text=Hassan' },
    { name: 'Ayesha', image: 'https://via.placeholder.com/150x150/3a4a8c/ffffff?text=Ayesha' },
    { name: 'Zara', image: 'https://via.placeholder.com/150x150/4a5a9c/ffffff?text=Zara' },
    { name: 'Hamza', image: 'https://via.placeholder.com/150x150/5a6aac/ffffff?text=Hamza' },
    { name: 'Laila', image: 'https://via.placeholder.com/150x150/6a7abc/ffffff?text=Laila' },
    { name: 'Omar', image: 'https://via.placeholder.com/150x150/7a8acc/ffffff?text=Omar' }
  ];

  private observer: IntersectionObserver | null = null;
  private animationStarted = false;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupCounterAnimation();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupCounterAnimation(): void {
    const counterElements = document.querySelectorAll('.counter');
    
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationStarted) {
          this.animationStarted = true;
          this.animateCounters();
          this.observer?.disconnect();
        }
      });
    }, { threshold: 0.3 });

    // Observe each counter
    counterElements.forEach(counter => {
      this.observer?.observe(counter);
    });
  }

  private animateCounters(): void {
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current).toString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toString();
        }
      };
      
      // Stagger animation
      setTimeout(() => {
        updateCounter();
      }, index * 200);
    });
  }
}
