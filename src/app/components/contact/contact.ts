// contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact{
  
  formData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  };

  charCount: number = 0;

  updateCharCount(): void {
    this.charCount = this.formData.message.length;
  }

  onSubmit(): void {
    if (this.formData.name && this.formData.email && this.formData.phone && this.formData.message) {
      console.log('Form Data:', this.formData);
      alert('Thank you for your message! We will get back to you soon.');
      this.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    };
    this.charCount = 0;
  }
}