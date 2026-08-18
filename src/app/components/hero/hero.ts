/* hero.component.ts - Updated without carousel */
import { Component, OnInit } from '@angular/core';
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
export class Hero implements OnInit {
  // Search Data
  searchData = {
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    sameLocation: true
  };

  ngOnInit(): void {
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.searchData.pickupDate = today.toISOString().split('T')[0];
    this.searchData.dropoffDate = tomorrow.toISOString().split('T')[0];
    this.searchData.pickupTime = '10:00';
  }

  // Search Handler
  onSearch(): void {
    console.log('Search Data:', this.searchData);
    // Navigate to results or process search
    // this.router.navigate(['/vehicles'], { queryParams: this.searchData });
  }
}