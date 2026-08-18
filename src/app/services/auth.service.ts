import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
}

export interface AuthResponse {
  isSuccess: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  user: UserInfo;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user';

  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = this.getAccessToken();
    const user = this.getUser();

    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.clearAuthData();
    }
  }

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/api/auth/register`, registerData)
      .pipe(
        tap((response) => {
          if (response.isSuccess) {
            this.handleAuthResponse(response);
          }
        }),
        catchError(this.handleError)
      );
  }

  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/api/auth/login`, loginData)
      .pipe(
        tap((response) => {
          if (response.isSuccess) {
            this.handleAuthResponse(response);
          }
        }),
        catchError(this.handleError)
      );
  }

  // ✅ Add Refresh Token Method
  refreshToken(): Observable<AuthResponse> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      this.logout();
      return throwError(() => new Error('No tokens available'));
    }

    const request: RefreshTokenRequest = {
      accessToken: accessToken,
      refreshToken: refreshToken
    };

    return this.http.post<AuthResponse>(`${this.API_URL}/api/auth/refresh-token`, request)
      .pipe(
        tap((response) => {
          if (response.isSuccess) {
            this.handleAuthResponse(response);
          } else {
            this.logout();
          }
        }),
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Session expired'));
        })
      );
  }

  logout(): void {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    if (refreshToken) {
      this.http.post(`${this.API_URL}/api/auth/logout`, {}, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        })
      }).subscribe({
        next: () => {
          this.clearAuthData();
          this.router.navigate(['/login']);
        },
        error: () => {
          this.clearAuthData();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.clearAuthData();
      this.router.navigate(['/login']);
    }
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (response.isSuccess && response.accessToken) {
      this.setAccessToken(response.accessToken);
      this.setRefreshToken(response.refreshToken);
      this.setUser(response.user);
      this.currentUserSubject.next(response.user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  getUser(): UserInfo | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setUser(user: UserInfo): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value && !!this.getAccessToken();
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}