import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

export interface ServiceDto {
    serviceId: number;
    serviceName: string;
    consultationFee: number;
    currency: string;
    description?: string;
    isActive: boolean;
}

export interface CreateAppointmentRequest {
    patientName: string;
    mobile: string;
    email: string;
    country: string;
    city: string;
    service: string; // ServiceName - sent to API
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

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private readonly apiUrl = 'http://ivf.runasp.net/api';

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    // Get all services from API
    getServices(): Observable<ApiResponse<ServiceDto[]>> {
        return this.http.get<ApiResponse<ServiceDto[]>>(
            `${this.apiUrl}/Service`,
            { headers: this.getHeaders() }
        ).pipe(
            timeout(30000),
            catchError(this.handleError)
        );
    }

    // Book Appointment - Sends service name, NOT fee
    bookAppointment(data: any): Observable<ApiResponse<AppointmentResponse>> {
        const requestData: CreateAppointmentRequest = {
            patientName: data.fullName,
            mobile: data.mobileNumber,
            email: data.email,
            country: data.country,
            city: data.city,
            service: data.service, // Only service name - NO FEE!
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
            timeout(30000),
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
            timeout(30000),
            catchError(this.handleError)
        );
    }

    // Get Appointment
    getAppointment(appointmentNumber: string): Observable<ApiResponse<AppointmentResponse>> {
        return this.http.get<ApiResponse<AppointmentResponse>>(
            `${this.apiUrl}/Appointment/${appointmentNumber}`,
            { headers: this.getHeaders() }
        ).pipe(
            catchError(this.handleError)
        );
    }

    // Get Payment Status
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