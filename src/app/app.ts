import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from "./components/modal/modal.component";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { WhatsappButtonComponent } from "./components/whatsapp-button/whatsapp-button.component";
import { ChatbotComponent } from "./components/chatbot/chatbot.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent, Header, Footer, HttpClientModule, WhatsappButtonComponent, ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Themedacess2');

    // WhatsApp Configuration
  whatsappNumber = '923001234567'; // Your WhatsApp number without +
  whatsappMessage = 'Hello! I would like to inquire about your fertility services.';
}
