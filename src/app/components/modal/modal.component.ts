import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  standalone:true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [NgIf]
})
export class ModalComponent implements OnInit, OnDestroy {
  
  showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Check if user has seen the modal before
    const modalSeen = localStorage.getItem('modalSeen');
    
    if (!modalSeen) {
      // Show modal after 1.5 seconds
      setTimeout(() => {
        this.showModal = true;
        document.body.style.overflow = 'hidden'; // Prevent scroll
      }, 1500);
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = 'auto';
    localStorage.setItem('modalSeen', 'true');
  }

  closeModalOnOverlay(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}
