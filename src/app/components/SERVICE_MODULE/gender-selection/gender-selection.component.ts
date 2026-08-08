import { Component } from '@angular/core';
import { ServiceData } from '../../../pages/shared.models';
import { ServiceFooterStatsComponent } from "../../../pages/service-footer-stats/service-footer-stats.component";

@Component({
  selector: 'app-gender-selection',
  templateUrl: './gender-selection.component.html',
  styleUrls: ['./gender-selection.component.css'],
  imports: [ServiceFooterStatsComponent]
})
export class GenderSelectionComponent {
  
  genderSelectionFooterData: ServiceData = {
    accordionId: 'genderSelectionAccordion',
    statsIntroText: 'The AI-Gender Selection™ platform delivers real-time, data-driven insights that enhance embryo screening accuracy, reduce selection errors, and improve IVF success rates — creating a balanced path toward healthy family planning.',
    stats: [
      { value: '>99%', label: 'Accuracy in gender identification using AI-integrated genetic screening' },
      { value: '>95%', label: 'Improvement in embryo selection precision through AI-guided analysis' },
      { value: '>40%', label: 'Higher implantation success rate from AI-verified embryos' }
    ],
    faqs: [
      { question: 'What is Gender Selection?', answer: 'Gender Selection is an advanced AI-assisted IVF technique...' },
      { question: 'Who can opt for Gender Selection?', answer: 'Parents looking to plan family balancing...' },
      { question: 'Is Gender Selection safe?', answer: 'Yes, it is performed with strict ethical and medical guidelines...' },
      { question: 'How is Gender Selection performed?', answer: 'Through genetic analysis of embryos before implantation...' },
      { question: 'What is the success rate of Gender Selection?', answer: 'Using AI, the success rate exceeds 99% in gender detection...' }
    ],
  };
}