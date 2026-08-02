import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ModalComponent } from "./components/modal/modal.component";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { WhatsappButtonComponent } from "./components/whatsapp-button/whatsapp-button.component";
import { ChatbotComponent } from "./components/chatbot/chatbot.component";
import { AosService } from './services/aos.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent, Header, Footer, HttpClientModule, WhatsappButtonComponent, ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private aosService: AosService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    // Initialize AOS
    this.aosService.initAOS();
  }
  protected readonly title = signal('Themedacess2');

  whatsappNumber = '923001234567'; // Your WhatsApp number without +
  whatsappMessage = 'Hello! I would like to inquire about your fertility services.';
}
