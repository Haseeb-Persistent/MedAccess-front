// cars-section.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cars-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cars-section.component.html',
  styleUrls: ['./cars-section.component.css']
})
export class CarsSectionComponent {
  
  cars = [
    {
      id: 1,
      name: 'Mercedes Grand Sedan',
      type: 'Luxury Sedan',
      price: 500,
      badge: 'Popular',
      isFavorite: false,
      features: ['5 Seats', 'Automatic', 'A/C', 'GPS'],
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Range Rover Sport',
      type: 'SUV',
      price: 650,
      badge: 'Premium',
      isFavorite: false,
      features: ['7 Seats', '4x4', 'Panoramic Roof', 'Leather'],
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Mercedes Grand Sedan',
      type: 'Luxury Sedan',
      price: 500,
      badge: null,
      isFavorite: false,
      features: ['5 Seats', 'Automatic', 'A/C', 'GPS'],
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'Chevrolet Camaro',
      type: 'Sports Car',
      price: 450,
      badge: 'Hot Deal',
      isFavorite: false,
      features: ['4 Seats', 'Manual', 'Sport Mode', 'Premium Sound'],
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      name: 'Subaru Outback',
      type: 'Cross Over',
      price: 420,
      badge: null,
      isFavorite: false,
      features: ['5 Seats', 'AWD', 'Roof Rack', 'All-Terrain'],
      image: 'https://images.unsplash.com/photo-1578844251758-2f71da64d6f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      name: 'Chevrolet Tahoe',
      type: 'Full Size SUV',
      price: 580,
      badge: 'Family Choice',
      isFavorite: false,
      features: ['8 Seats', '4x4', 'Towing', 'Premium Audio'],
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  viewDetails(car: any): void {
    console.log('Viewing details for:', car.name);
    // Navigate to car details page
    // this.router.navigate(['/car', car.id]);
  }

  bookNow(car: any): void {
    console.log('Booking:', car.name);
    // Navigate to booking page
    // this.router.navigate(['/book', car.id]);
  }

  toggleFavorite(car: any): void {
    car.isFavorite = !car.isFavorite;
    console.log('Favorite toggled:', car.name, car.isFavorite);
  }
}