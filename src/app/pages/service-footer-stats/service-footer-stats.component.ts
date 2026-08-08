import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ServiceData } from '../shared.models'; // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-footer-stats',
  imports: [CommonModule],
  templateUrl: './service-footer-stats.component.html',
  styleUrls: ['./service-footer-stats.component.css']
})
export class ServiceFooterStatsComponent  implements  AfterViewInit  {
  @Input() data!: ServiceData;

  constructor(private el: ElementRef) {}

    ngAfterViewInit() {
    // Attach click listeners to all FAQ buttons inside this component
    const buttons = this.el.nativeElement.querySelectorAll('.ivf-question');
    buttons.forEach((btn: HTMLElement) => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
        // Find the parent .ivf-item and toggle class
        const parent = btn.closest('.ivf-item');
        if(parent) {
            parent.classList.toggle('open');
        }
      });
    });
  }
}