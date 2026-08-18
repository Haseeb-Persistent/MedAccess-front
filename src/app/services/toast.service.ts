import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastContainer!: HTMLDivElement;

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer(): void {
    this.toastContainer = document.createElement('div');
    this.toastContainer.id = 'toast-container';
    this.toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      width: 100%;
    `;
    document.body.appendChild(this.toastContainer);
  }

  success(message: string): void {
    this.showToast(message, 'success');
  }

  error(message: string): void {
    this.showToast(message, 'error');
  }

  warning(message: string): void {
    this.showToast(message, 'warning');
  }

  info(message: string): void {
    this.showToast(message, 'info');
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    const toast = document.createElement('div');
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };

    toast.style.cssText = `
      background: #1e293b;
      color: #f8fafc;
      padding: 16px 20px;
      border-left: 4px solid ${colors[type]};
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease-out;
      border-radius: 8px;
    `;

    // Icon based on type
    const icon = document.createElement('span');
    icon.style.fontSize = '20px';
    switch (type) {
      case 'success': icon.textContent = '✅'; break;
      case 'error': icon.textContent = '❌'; break;
      case 'warning': icon.textContent = '⚠️'; break;
      case 'info': icon.textContent = 'ℹ️'; break;
    }
    toast.appendChild(icon);

    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);

    this.toastContainer.appendChild(toast);

    // Trigger slide in animation
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }
}