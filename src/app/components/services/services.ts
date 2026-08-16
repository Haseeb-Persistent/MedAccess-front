// service.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services {

  // ===== VEHICLE CATEGORIES DATA =====
  categories = [
    {
      id: 1,
      title: 'Budget',
      description: 'Daihatsu Mira or similar',
      icon: 'fas fa-car',
      active: false,
      route: '/vehicles/budget-cars-on-rent'
    },
    {
      id: 2,
      title: 'Standard',
      description: 'Toyota Corolla or similar',
      icon: 'fas fa-car-side',
      active: false,
      route: '/vehicles/standard-cars-on-rent'
    },
    {
      id: 3,
      title: 'Luxury',
      description: 'Mercedes Benz or similar',
      icon: 'fas fa-caravan',
      active: false,
      route: '/vehicles/luxury-cars-on-rent'
    },
    {
      id: 4,
      title: 'SUV',
      description: 'Land Cruiser or similar',
      icon: 'fas fa-truck',
      active: false,
      route: '/vehicles/suv-cars-on-rent'
    },
    {
      id: 5,
      title: 'Vans & Coasters',
      description: 'Toyota Coaster or similar',
      icon: 'fas fa-shuttle-van',
      active: false,
      route: '/vehicles/vans-and-coasters-on-rent'
    }
  ];

  // ===== FAQ DATA =====
  faqs = [
    {
      question: 'Who can rent a car?',
      answer: 'Anyone with a valid driving license and minimum age of 21 years can rent a car. For luxury vehicles, the minimum age is 25 years. A valid ID proof and driving license are required at the time of rental.',
      open: false
    },
    {
      question: 'Can I rent a car with and without driver both?',
      answer: 'Yes, we offer both self-drive and chauffeur-driven options. You can choose according to your preference. Our trained drivers are available for all types of vehicles.',
      open: false
    },
    {
      question: 'How can I pay the rent?',
      answer: 'We accept multiple payment methods including cash, credit/debit cards, bank transfers, and mobile wallets. Online payments can be made through our secure payment gateway.',
      open: false
    },
    {
      question: 'Do I need to pay any security deposit?',
      answer: 'Yes, a refundable security deposit is required at the time of booking. The amount varies based on the vehicle category. The deposit is fully refundable upon return of the vehicle in good condition.',
      open: false
    },
    {
      question: 'What happens if an accident occurs?',
      answer: 'In case of an accident, immediately contact our emergency helpline. We provide 24/7 roadside assistance. The vehicle is fully insured, and our team will guide you through the claim process.',
      open: false
    },
    {
      question: 'What is your fuel policy?',
      answer: 'We follow a fair fuel policy. The vehicle is provided with a full tank of fuel and should be returned with a full tank. Alternatively, you can pay for the fuel consumed at the end of the rental period.',
      open: false
    }
  ];

  // ===== METHODS =====

  // Select Category
  selectCategory(selectedCategory: any): void {
    this.categories.forEach(cat => cat.active = false);
    selectedCategory.active = true;
    console.log('Selected category:', selectedCategory.title);
    // Uncomment to navigate
    // this.router.navigate([selectedCategory.route]);
  }

  // Toggle FAQ
  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
    // Close other FAQs (optional)
    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.open = false;
      }
    });
  }
}