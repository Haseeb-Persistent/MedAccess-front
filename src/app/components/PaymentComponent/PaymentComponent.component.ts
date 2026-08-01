// payment/payment.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-body text-center p-5">
                    <h2><i class="bi bi-credit-card text-primary"></i> Payment</h2>
                    <p class="lead">Appointment: <strong>{{ appointmentNumber }}</strong></p>
                    <p>Amount: <strong>$50.00</strong></p>
                    <button class="btn btn-primary btn-lg mt-3" (click)="processPayment()">
                        <i class="bi bi-lock"></i> Pay Now
                    </button>
                    <button class="btn btn-outline-secondary mt-3 ms-2" (click)="goBack()">
                        <i class="bi bi-arrow-left"></i> Back
                    </button>
                </div>
            </div>
        </div>
    `
})
export class PaymentComponent implements OnInit {
    appointmentNumber: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.appointmentNumber = params['appointmentNumber'];
            console.log('Payment page for appointment:', this.appointmentNumber);
        });
    }

    processPayment(): void {
        // Redirect to Stripe or payment gateway
        alert('Processing payment for appointment: ' + this.appointmentNumber);
        // this.router.navigate(['/payment-success']);
    }

    goBack(): void {
        this.router.navigate(['/']);
    }
}