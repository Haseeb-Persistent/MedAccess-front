// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CreateAppointmentRequest {
    patientName: string;    // <-- Changed from fullName
    mobile: string;         // <-- Changed from mobileNumber
    email: string;
    country: string;
    city: string;
    service: string;
    doctor: string;
    appointmentDate: string;
    appointmentTime: string;
    message?: string;
    paymentMethod: string;
}

export interface AppointmentResponse {
    appointmentId: number;
    appointmentNumber: string;
    orderNumber?: string;
    paymentStatus: string;
    appointmentStatus: string;
    amount: number;
    currency: string;
    checkoutSessionId?: string;
    redirectUrl?: string;
    message: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface CheckoutSessionResponse {
    success: boolean;
    message: string;
    data: {
        redirectUrl: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private readonly apiUrl = 'https://localhost:7179/api';

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    // Book Appointment - Maps frontend fields to API expected fields
    bookAppointment(data: any): Observable<ApiResponse<AppointmentResponse>> {
        // Map frontend field names to API expected field names
        const requestData: CreateAppointmentRequest = {
            patientName: data.fullName,        // Map fullName -> patientName
            mobile: data.mobileNumber,          // Map mobileNumber -> mobile
            email: data.email,
            country: data.country,
            city: data.city,
            service: data.service,
            doctor: data.doctor,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            message: data.message || '',
            paymentMethod: data.paymentMethod
        };

        console.log('Sending request to API:', requestData);

        return this.http.post<ApiResponse<AppointmentResponse>>(
            `${this.apiUrl}/Appointment/book`,
            requestData,
            { headers: this.getHeaders() }
        ).pipe(
            map(response => {
                console.log('API Response:', response);
                return response;
            }),
            catchError(this.handleError)
        );
    }

    // Create Checkout Session
    createCheckoutSession(appointmentId: number): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/Payment/create-checkout-session`,
            { appointmentId },
            { headers: this.getHeaders() }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Get Appointment by Number
    getAppointment(appointmentNumber: string): Observable<ApiResponse<AppointmentResponse>> {
        return this.http.get<ApiResponse<AppointmentResponse>>(
            `${this.apiUrl}/Appointment/${appointmentNumber}`,
            { headers: this.getHeaders() }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Get Appointment Payment Status
    getPaymentStatus(appointmentNumber: string): Observable<ApiResponse<AppointmentResponse>> {
        return this.http.get<ApiResponse<AppointmentResponse>>(
            `${this.apiUrl}/Payment/${appointmentNumber}/payment-status`,
            { headers: this.getHeaders() }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Cancel Appointment
    cancelAppointment(appointmentNumber: string): Observable<ApiResponse<boolean>> {
        return this.http.delete<ApiResponse<boolean>>(
            `${this.apiUrl}/Appointment/${appointmentNumber}`,
            { headers: this.getHeaders() }
        ).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        console.error('API Error:', error);
        let errorMessage = 'An error occurred. Please try again.';
        
        if (error.error?.error) {
            errorMessage = error.error.error;
        } else if (error.error?.message) {
            errorMessage = error.error.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
    }
}