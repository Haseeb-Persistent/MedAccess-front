// components/whatsapp-button/whatsapp-button.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css']
})
export class WhatsappButtonComponent implements OnInit {
  @Input() phoneNumber: string = '923001234567'; // Default: Pakistan number without +
  @Input() message: string = 'Hello! I would like to inquire about your services.';
  @Input() position: 'bottom-left' | 'bottom-right' = 'bottom-right';
  @Input() showTooltip: boolean = true;
  @Input() tooltipText: string = 'Chat with us on WhatsApp';

  whatsappUrl: string = '';

  ngOnInit(): void {
    // Build WhatsApp URL
    const encodedMessage = encodeURIComponent(this.message);
    this.whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
  }

  openWhatsApp(): void {
    window.open(this.whatsappUrl, '_blank');
  }
}