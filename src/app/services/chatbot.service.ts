// services/chatbot.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: Date;
    type: 'text' | 'image' | 'quick_reply';
    read?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {
    private responseSubject = new BehaviorSubject<string>('');
    private conversationHistory: ChatMessage[] = [];
    private readonly apiUrl = environment.apiUrl + '/chatbot'; 

    constructor(private http: HttpClient) {}

    sendMessage(message: string): void {
        // Add to history
        this.conversationHistory.push({
            id: `user-${Date.now()}`,
            sender: 'user',
            text: message,
            timestamp: new Date(),
            type: 'text'
        });

        // Get response from API or fallback to local responses
        this.getAIResponse(message).subscribe({
            next: (response) => {
                this.responseSubject.next(response);
                this.conversationHistory.push({
                    id: `bot-${Date.now()}`,
                    sender: 'bot',
                    text: response,
                    timestamp: new Date(),
                    type: 'text',
                    read: false
                });
            },
            error: (error) => {
                console.error('Error getting AI response:', error);
                // Fallback to local response
                const fallbackResponse = this.getLocalResponse(message);
                this.responseSubject.next(fallbackResponse);
                this.conversationHistory.push({
                    id: `bot-${Date.now()}`,
                    sender: 'bot',
                    text: fallbackResponse,
                    timestamp: new Date(),
                    type: 'text',
                    read: false
                });
            }
        });
    }

    getResponse(): Observable<string> {
        return this.responseSubject.asObservable();
    }

    getConversationHistory(): ChatMessage[] {
        return this.conversationHistory;
    }

    clearHistory(): void {
        this.conversationHistory = [];
        this.responseSubject.next('');
    }

    // ============================================================
    // AI API Integration (OpenAI/Gemini/Custom)
    // ============================================================
    private getAIResponse(message: string): Observable<string> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const payload = {
            message: message,
            history: this.conversationHistory.slice(-5) // Last 5 messages for context
        };

        return this.http.post<{ response: string }>(
            `${this.apiUrl}/chat`,
            payload,
            { headers }
        ).pipe(
            map(response => response.response)
        );
    }

    // ============================================================
    // FALLBACK: Local AI Responses (for demo without API)
    // ============================================================
    private getLocalResponse(message: string): string {
        const lowerMsg = message.toLowerCase();

        // Appointment related
        if (lowerMsg.includes('appointment') || lowerMsg.includes('book')) {
            return `📅 I can help you book an appointment! Please visit our Appointment page or provide your preferred date and time. Our specialists will get back to you within 24 hours.`;
        }

        // Services related
        if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('treatment')) {
            return `🏥 We offer comprehensive fertility services including:
• IVF (In Vitro Fertilization)
• IUI (Intrauterine Insemination)
• ICSI (Intracytoplasmic Sperm Injection)
• Egg Freezing
• Embryo Transfer
• Fertility Preservation
• Genetic Testing
• Surrogacy

Feel free to ask about any specific treatment!`;
        }

        // IVF specific
        if (lowerMsg.includes('ivf')) {
            return `🧬 IVF (In Vitro Fertilization) is a process where eggs are retrieved from the ovaries, fertilized with sperm in a lab, and the resulting embryos are transferred to the uterus. Our success rates are among the highest in the region. Would you like to know more about the IVF process?`;
        }

        // Success rates
        if (lowerMsg.includes('success') || lowerMsg.includes('rate')) {
            return `📊 Our success rates vary by treatment type and patient age. On average:
• IVF: 45-55% success rate (under 35)
• IUI: 15-20% success rate per cycle
• ICSI: 50-60% success rate (under 35)

We recommend a consultation for personalized success rate projections based on your specific situation.`;
        }

        // Fees / Payment
        if (lowerMsg.includes('fee') || lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('payment')) {
            return `💰 Our consultation and treatment fees vary based on the service selected. Please visit our Services page for detailed pricing. We offer flexible payment options including:
• Online Payment (Stripe)
• Pay at Clinic
• Installment plans available upon request`;
        }

        // Contact
        if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email') || lowerMsg.includes('address')) {
            return `📞 You can reach us at:
• Phone: +92 300 1234567
• Email: info@medaccess.com
• Address: 28/A Street, New York City

We're available Monday - Saturday, 10:00AM - 06:00PM.
You can also use the WhatsApp button on the bottom right to chat instantly!`;
        }

        // Doctors
        if (lowerMsg.includes('doctor') || lowerMsg.includes('specialist')) {
            return `👨‍⚕️ Our team of experienced fertility specialists includes:
• Dr. Ahmed Khan - IVF & IUI Specialist
• Dr. Fatima Ali - Egg Freezing Expert
• Dr. Muhammad Usman - ICSI Specialist
• Dr. Sarah Ahmed - Gynecologist
• Dr. Hassan Raza - Urologist

All our doctors are internationally trained and have over 10 years of experience.`;
        }

        // Hours / Timing
        if (lowerMsg.includes('hour') || lowerMsg.includes('timing') || lowerMsg.includes('open')) {
            return `🕐 We're open:
Monday - Saturday: 10:00AM - 06:00PM
Sunday: Closed

Emergency consultations available 24/7. Call us for urgent appointments.`;
        }

        // Default responses
        const defaultResponses = [
            `I'm here to help! Please let me know what specific fertility service or treatment you'd like to learn more about.`,
            `That's a great question! Could you please provide more details so I can give you the most accurate information?`,
            `I'd be happy to assist you with that. Would you like to schedule a consultation with one of our specialists?`,
            `Thank you for reaching out! For more detailed information, I'd recommend booking a consultation with our team.`,
            `I understand you're asking about our services. We offer a wide range of fertility treatments. Which one are you interested in?`
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}