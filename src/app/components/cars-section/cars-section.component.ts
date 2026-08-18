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
      name: 'Honda Civic',
      type: 'Sedan',
      basePrice: '10,000',
      badge: 'BEST PRICE RATE SELECTED!',
      isFavorite: false,
      features: ['5 Seats', 'With Driver (10hrs/day)', 'Self Drive (24hrs)', 'Automatic'],
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      pricingOptions: [
        { label: 'With Driver', price: '₨ 350/hr' },
        { label: 'Self Drive', price: '₨ 8,500/day' }
      ],
      details: {
        transmission: 'Automatic',
        seats: 5,
        fuel: 'Petrol',
        cancellation: 'FREE CANCELLATION',
        extraCharges: 'Activating fuel & overtime charges'
      }
    },
    {
      id: 2,
      name: 'Toyota Corolla Altis',
      type: 'Sedan',
      basePrice: '8,500',
      badge: 'BEST PRICE RATE SELECTED!',
      isFavorite: false,
      features: ['4 Seats', 'Automatic', 'With Driver', 'Self Drive'],
      image: 'https://images.unsplash.com/photo-1623869675786-5daa53c4c1fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      pricingOptions: [
        { label: 'With Driver', price: '₨ 350/hr' },
        { label: 'Self Drive', price: '₨ 7,500/day' }
      ],
      details: {
        transmission: 'Automatic',
        seats: 4,
        fuel: 'Petrol',
        cancellation: 'FREE CANCELLATION',
        extraCharges: 'Refill fuel at the end of the day or pay ₨ 40/KM'
      }
    },
    {
      id: 3,
      name: 'Mercedes Benz E-Class',
      type: 'Luxury Sedan',
      basePrice: '25,000',
      badge: 'Premium',
      isFavorite: false,
      features: ['5 Seats', 'Automatic', 'Leather Seats', 'Panoramic Roof'],
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      pricingOptions: [
        { label: 'With Driver', price: '₨ 500/hr' },
        { label: 'Self Drive', price: '₨ 22,000/day' }
      ],
      details: {
        transmission: 'Automatic',
        seats: 5,
        fuel: 'Diesel',
        cancellation: 'FREE CANCELLATION',
        extraCharges: 'Premium insurance included'
      }
    },
    {
      id: 4,
      name: 'Toyota Land Cruiser',
      type: 'SUV',
      basePrice: '30,000',
      badge: 'Family Choice',
      isFavorite: false,
      features: ['7 Seats', '4x4', 'Automatic', 'Off-Road'],
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      pricingOptions: [
        { label: 'With Driver', price: '₨ 450/hr' },
        { label: 'Self Drive', price: '₨ 28,000/day' }
      ],
      details: {
        transmission: 'Automatic',
        seats: 7,
        fuel: 'Diesel',
        cancellation: 'FREE CANCELLATION',
        extraCharges: 'Off-road package available'
      }
    },
    {
      id: 5,
      name: 'Toyota Coaster',
      type: 'Vans & Coasters',
      basePrice: '35,000',
      badge: 'Group Travel',
      isFavorite: false,
      features: ['14 Seats', 'With Driver', 'A/C', 'Luggage Space'],
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      pricingOptions: [
        { label: 'With Driver', price: '₨ 500/hr' },
        { label: 'Self Drive', price: '₨ 32,000/day' }
      ],
      details: {
        transmission: 'Manual',
        seats: 14,
        fuel: 'Diesel',
        cancellation: 'FREE CANCELLATION',
        extraCharges: 'Perfect for group tours'
      }
    },
    {
      id: 6,
      name: 'Daihatsu Mira',
      type: 'Budget',
      basePrice: '5,500',
      badge: 'Economy',
      isFavorite: false,
      features: ['4 Seats', 'Manual', 'A/C', 'Fuel Efficient'],
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      pricingOptions: [
        { label: 'With Driver', price: '₨ 250/hr' },
        { label: 'Self Drive', price: '₨ 5,000/day' }
      ],
      details: {
        transmission: 'Manual',
        seats: 4,
        fuel: 'Petrol',
        cancellation: 'FREE CANCELLATION',
        extraCharges: 'Best for city driving'
      }
    }
  ];

  // Filter state
  filters = {
    model: 'All',
    vehicleType: 'All',
    bookingType: 'All'
  };

  // Available filter options
  filterOptions = {
    models: ['All', 'Honda', 'Toyota', 'Mercedes', 'Daihatsu'],
    vehicleTypes: ['All', 'Sedan', 'SUV', 'Luxury Sedan', 'Vans & Coasters', 'Budget'],
    bookingTypes: ['All', 'In City', 'Out City', 'Short Rental']
  };

  // View car details
  viewDetails(car: any): void {
    console.log('Viewing details for:', car.name);
    // Navigate to car details page
    // this.router.navigate(['/car', car.id]);
    // You can also open a modal or expand the card
  }

  // Book car
  bookNow(car: any): void {
    console.log('Booking:', car.name, 'with details:', car.details);
    // Navigate to booking page with car data
    // this.router.navigate(['/book', car.id], { state: { car } });
    // Or open booking modal
  }

  // Toggle favorite
  toggleFavorite(car: any): void {
    car.isFavorite = !car.isFavorite;
    console.log('Favorite toggled:', car.name, car.isFavorite);
    // You can save to localStorage or send to backend
  }

  // Apply filters
  applyFilters(): void {
    console.log('Applying filters:', this.filters);
    // Filter logic here
    // You can implement filtering based on the selected filters
    // For now, we just log the filters
  }

  // Reset filters
  resetFilters(): void {
    this.filters = {
      model: 'All',
      vehicleType: 'All',
      bookingType: 'All'
    };
    console.log('Filters reset');
  }

  // Get filtered cars
  get filteredCars(): any[] {
    // Implement filter logic if needed
    // For now, return all cars
    return this.cars;
  }
}