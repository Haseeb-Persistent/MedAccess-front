// footer.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
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