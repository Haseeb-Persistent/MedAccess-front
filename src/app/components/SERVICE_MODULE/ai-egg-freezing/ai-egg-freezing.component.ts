import { Component } from '@angular/core';
import { ServiceData } from '../../../pages/shared.models'; // Adjust path to match your project
import { ServiceFooterStatsComponent } from "../../../pages/service-footer-stats/service-footer-stats.component"; // Adjust path to match your project

@Component({
  selector: 'app-ai-egg-freezing',
  templateUrl: './ai-egg-freezing.component.html',
  styleUrls: ['./ai-egg-freezing.component.css'],
  standalone: true,
  imports: [ServiceFooterStatsComponent]
})
export class AiEggFreezingComponent {
  
  eggFreezingFooterData: ServiceData = {
    accordionId: 'eggFreezingAccordion',
    statsIntroText: 'Our AI-powered egg freezing platform ensures the highest quality egg selection, providing advanced insights that boost future IVF efficiency and improve reproductive outcomes.',
    stats: [
      { value: '>95%', label: 'Egg survival rate after AI-guided vitrification' },
      { value: '>97.8%', label: 'Increase in accurate egg quality assessment using AI' },
      { value: '>30%', label: 'Improvement in future IVF success rates from AI-selected eggs' }
    ],
    faqs: [
      { question: 'What is AI Egg Freezing?', answer: 'AI Egg Freezing is an advanced fertility technique where a woman\'s eggs are retrieved, analyzed using AI, and frozen for future use. AI helps select the healthiest eggs to improve success rates.' },
      { question: 'Who should consider Egg Freezing?', answer: 'It is ideal for women who wish to delay pregnancy due to career, education, or medical reasons, as well as women undergoing treatments like chemotherapy that may affect fertility.' },
      { question: 'Is the AI Egg Freezing procedure safe?', answer: 'Yes, it is a minimally invasive procedure performed under sedation with high safety standards. AI simply enhances the selection process without adding risk.' },
      { question: 'How does AI improve egg selection?', answer: 'AI analyzes high-resolution images and metabolic markers of the eggs to identify the ones with the highest developmental potential, ensuring only the best are frozen.' },
      { question: 'How long can AI-selected eggs be frozen?', answer: 'Eggs can be safely cryopreserved using advanced vitrification methods for many years (up to 10+ years) without significant loss of quality.' }
    ],
  };
}