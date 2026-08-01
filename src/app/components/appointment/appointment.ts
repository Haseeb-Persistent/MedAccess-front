// appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointmentService, AppointmentResponse, ServiceDto } from './../../services/appointment.service';

declare var Stripe: any;

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.css']
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;

  countries = [
    { id: 1, name: 'Pakistan' },
    { id: 2, name: 'United States' },
    { id: 3, name: 'United Kingdom' },
    { id: 4, name: 'Canada' },
    { id: 5, name: 'Australia' },
    { id: 6, name: 'India' },
    { id: 7, name: 'UAE' },
    { id: 8, name: 'Saudi Arabia' },
    { id: 9, name: 'Germany' },
    { id: 10, name: 'France' }
  ];

  cities = [
    { id: 1, name: 'Lahore', country: 'Pakistan' },
    { id: 2, name: 'Karachi', country: 'Pakistan' },
    { id: 3, name: 'Islamabad', country: 'Pakistan' },
    { id: 4, name: 'Rawalpindi', country: 'Pakistan' },
    { id: 5, name: 'Faisalabad', country: 'Pakistan' },
    { id: 6, name: 'Multan', country: 'Pakistan' },
    { id: 7, name: 'New York', country: 'United States' },
    { id: 8, name: 'Los Angeles', country: 'United States' },
    { id: 9, name: 'London', country: 'United Kingdom' },
    { id: 10, name: 'Manchester', country: 'United Kingdom' },
    { id: 11, name: 'Toronto', country: 'Canada' },
    { id: 12, name: 'Vancouver', country: 'Canada' }
  ];

  // Services loaded from API
  services: ServiceDto[] = [];

  doctors = [
    { id: 1, name: 'Dr. Ahmed', service: 'IUI (Intrauterine Insemination)' },
    { id: 2, name: 'Dr. Fatima', service: 'IVF (In Vitro Fertilization)' },
    { id: 3, name: 'Dr. Ali', service: 'ICSI (Intracytoplasmic Sperm Injection)' },
    { id: 4, name: 'Dr. Sarah', service: 'Egg Freezing' },
    { id: 5, name: 'Dr. Khan', service: 'Embryo Transfer' },
    { id: 6, name: 'Dr. Zara', service: 'Fertility Preservation' },
    { id: 7, name: 'Dr. Usman', service: 'Genetic Testing' },
    { id: 8, name: 'Dr. Ayesha', service: 'Surrogacy' },
    { id: 9, name: 'Dr. Hassan', service: 'IVF (In Vitro Fertilization)' },
    { id: 10, name: 'Dr. Mariam', service: 'IUI (Intrauterine Insemination)' }
  ];

  filteredCities: any[] = [];
  filteredDoctors: any[] = [];
  isSubmitting = false;
  isSuccess = false;
  isError = false;
  errorMessage = '';
  minDate: string = '';
  appointmentResponse: AppointmentResponse | null = null;
  stripe: any = null;
  stripePublishableKey = 'pk_test_51TzAo7RuXfnsrTjgaQN9PMwhuSEtNCRgAvhhLn9WXwuAc6KzFgULT2rUEDhh1qa6yOY0bmxk7inyq1nyFVpd6UYo00mhzBStng';
  redirectUrl: string | null = null;
  isLoadingServices = false;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.filteredDoctors = this.doctors;
    this.filteredCities = this.cities;

    // Initialize Form
    this.initializeForm();

    // Load services from API
    await this.loadServices();

    // Initialize Stripe
    this.stripe = Stripe(this.stripePublishableKey);
  }

  // ============================================
  // INITIALIZE REACTIVE FORM - FIXED REGEX
  // ============================================
  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      // FIXED: Put - at the end or escape it
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9+() -]+$')]], // FIXED!
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      service: ['', Validators.required],
      doctor: ['', Validators.required],
      appointmentDate: ['', [Validators.required, this.futureDateValidator]],
      appointmentTime: ['', Validators.required],
      message: ['', Validators.maxLength(500)],
      paymentMethod: ['online', Validators.required]
    });

    // Listen to country change for filtering cities
    this.appointmentForm.get('country')?.valueChanges.subscribe(country => {
      this.onCountryChange(country);
    });

    // Listen to service change for filtering doctors
    this.appointmentForm.get('service')?.valueChanges.subscribe(service => {
      this.onServiceChange(service);
    });
  }

  // ============================================
  // CUSTOM VALIDATOR: Future Date
  // ============================================
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  }

  // ============================================
  // GETTERS FOR EASY ACCESS IN TEMPLATE
  // ============================================
  get fullName() { return this.appointmentForm?.get('fullName'); }
  get mobileNumber() { return this.appointmentForm?.get('mobileNumber'); }
  get email() { return this.appointmentForm?.get('email'); }
  get country() { return this.appointmentForm?.get('country'); }
  get city() { return this.appointmentForm?.get('city'); }
  get service() { return this.appointmentForm?.get('service'); }
  get doctor() { return this.appointmentForm?.get('doctor'); }
  get appointmentDate() { return this.appointmentForm?.get('appointmentDate'); }
  get appointmentTime() { return this.appointmentForm?.get('appointmentTime'); }
  get message() { return this.appointmentForm?.get('message'); }
  get paymentMethod() { return this.appointmentForm?.get('paymentMethod'); }

  // ============================================
  // LOAD SERVICES FROM API
  // ============================================
  async loadServices(): Promise<void> {
    this.isLoadingServices = true;
    try {
      const result = await this.appointmentService.getServices().toPromise();
      console.log('Services API Response:', result);
      
      if (result?.success && result.data) {
        this.services = result.data;
        console.log('Services loaded from API:', this.services);
      } else {
        console.error('Failed to load services:', result?.error);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      this.isLoadingServices = false;
    }
  }

  // ============================================
  // COUNTRY CHANGE - Filter Cities
  // ============================================
  onCountryChange(country: string): void {
    if (country) {
      this.filteredCities = this.cities.filter(
        city => city.country === country
      );
      this.appointmentForm?.get('city')?.setValue('');
    } else {
      this.filteredCities = this.cities;
    }
  }

  // ============================================
  // SERVICE CHANGE - Filter Doctors
  // ============================================
  onServiceChange(service: string): void {
    if (service) {
      this.filteredDoctors = this.doctors.filter(
        doctor => doctor.service === service
      );
      this.appointmentForm?.get('doctor')?.setValue('');
    } else {
      this.filteredDoctors = this.doctors;
    }
  }

  // ============================================
  // FORM SUBMISSION
  // ============================================
  async onSubmit(): Promise<void> {
    if (!this.appointmentForm) return;
    
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.isSuccess = false;
    this.isError = false;
    this.errorMessage = '';

    try {
      const formData = this.appointmentForm.value;
      
      // Step 1: Book Appointment
      const appointmentResult = await this.appointmentService.bookAppointment(formData).toPromise();
      
      console.log('Appointment Result:', appointmentResult);

      if (!appointmentResult?.success || !appointmentResult.data) {
        throw new Error(appointmentResult?.error || 'Failed to book appointment');
      }

      this.appointmentResponse = appointmentResult.data;
      this.isSuccess = true;

      // Step 2: If online payment, create checkout session and redirect
      if (formData.paymentMethod === 'online') {
        await this.handleOnlinePayment(this.appointmentResponse);
      } else {
        this.isSubmitting = false;
        setTimeout(() => this.isSuccess = false, 10000);
      }

    } catch (error: any) {
      console.error('Error:', error);
      this.isSubmitting = false;
      this.isError = true;
      this.errorMessage = error.message || 'An error occurred. Please try again.';
      setTimeout(() => this.isError = false, 5000);
    }
  }

  // ============================================
  // ONLINE PAYMENT HANDLER
  // ============================================
  async handleOnlinePayment(appointment: AppointmentResponse): Promise<void> {
    try {
      // Create Stripe Checkout Session
      const sessionResult = await this.appointmentService.createCheckoutSession(
        appointment.appointmentId
      ).toPromise();

      console.log('Checkout Session Result:', sessionResult);

      if (!sessionResult?.success || !sessionResult?.data?.redirectUrl) {
        throw new Error('Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const stripeUrl = sessionResult.data.redirectUrl;
      console.log('Redirecting to Stripe:', stripeUrl);
      
      // Direct redirect to Stripe
      window.location.href = stripeUrl;

    } catch (error: any) {
      console.error('Payment error:', error);
      this.isSubmitting = false;
      this.isError = true;
      this.errorMessage = error.message || 'Failed to initiate payment. Please try again.';
      throw error;
    }
  }

  // ============================================
  // REDIRECT TO PAYMENT
  // ============================================
  redirectToPayment(): void {
    if (this.appointmentResponse?.redirectUrl) {
      window.location.href = this.appointmentResponse.redirectUrl;
    } else if (this.redirectUrl) {
      window.location.href = this.redirectUrl;
    }
  }

  // ============================================
  // RESET FORM
  // ============================================
  resetForm(): void {
    if (!this.appointmentForm) return;
    
    this.appointmentForm.reset({
      fullName: '',
      mobileNumber: '',
      email: '',
      country: '',
      city: '',
      service: '',
      doctor: '',
      appointmentDate: '',
      appointmentTime: '',
      message: '',
      paymentMethod: 'online'
    });
    this.filteredCities = this.cities;
    this.filteredDoctors = this.doctors;
    this.redirectUrl = null;
    this.appointmentResponse = null;
    this.appointmentForm.markAsPristine();
    this.appointmentForm.markAsUntouched();
  }
}