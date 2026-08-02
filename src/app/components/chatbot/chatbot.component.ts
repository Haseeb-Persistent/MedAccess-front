// components/chatbot/chatbot.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() position: 'bottom-right' | 'bottom-left' = 'bottom-right';
  @Input() botName: string = 'MedAccess AI Assistant';
  @Input() botAvatar: string = 'assets/images/bot-avatar.png';
  @Input() userAvatar: string = 'assets/images/user-avatar.png';
  
  isOpen: boolean = false;
  isMinimized: boolean = false;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  isTyping: boolean = false;
  unreadCount: number = 0;

  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    // Initialize with welcome message
    this.messages = [
      {
        id: 'welcome',
        sender: 'bot',
        text: `👋 Welcome to ${this.botName}! I'm here to help you with your fertility journey. How can I assist you today?`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    // Subscribe to responses
    this.chatbotService.getResponse().subscribe(response => {
      this.isTyping = false;
      this.messages.push({
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response,
        timestamp: new Date(),
        type: 'text'
      });
      this.scrollToBottom();
      this.updateUnreadCount();
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
    if (!this.isMinimized) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: this.newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };
    this.messages.push(userMessage);
    this.newMessage = '';
    this.scrollToBottom();

    // Show typing indicator
    this.isTyping = true;

    // Send to service
    this.chatbotService.sendMessage(userMessage.text);
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatMessagesContainer) {
        this.chatMessagesContainer.nativeElement.scrollTop = 
          this.chatMessagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      // Ignore
    }
  }

  private updateUnreadCount(): void {
    if (!this.isOpen) {
      this.unreadCount = this.messages.filter(m => m.sender === 'bot' && !m.read).length;
    }
  }

  formatTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  ngOnDestroy(): void {
    this.chatbotService.clearHistory();
  }

  // Quick reply options
  quickReplies: string[] = [
    'What services do you offer?',
    'Book an appointment',
    'What is IVF?',
    'Success rates',
    'Contact information',
    'Fees and payment'
  ];

  sendQuickReply(reply: string): void {
    this.newMessage = reply;
    this.sendMessage();
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}