import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule,],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  
  email: string = '';

  constructor() { }

  ngOnInit(): void {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }

  onSubscribe(): void {
    if (this.email) {
      console.log('Subscribed with email:', this.email);
      // Add your newsletter subscription logic here
      alert('Thank you for subscribing!');
      this.email = '';
    } else {
      alert('Please enter your email address.');
    }
  }
}