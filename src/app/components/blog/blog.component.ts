import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs = [
    {
      id: 1,
      title: 'AI-IUI',
      icon: 'fa-solid fa-microscope',
      description: `AI-IUI (Artificial Intelligence Assisted Intrauterine Insemination) is an advanced form of IUI in which AI-powered tools are used to analyze sperm quality, select the healthiest sperm, and improve the chances of successful conception. The semen sample is processed and enhanced through AI-based algorithms before being gently inserted into the uterus using a catheter. This technique increases accuracy, improves timing, and significantly enhances pregnancy success rates compared to traditional IUI.`,
      color: '#031888',
      lightColor: '#e8f0fe'
    },
    {
      id: 2,
      title: 'AI-Gender Selection',
      icon: 'fa-solid fa-venus-mars',
      description: `AI-powered sperm analysis uses advanced algorithms to study the DNA content of sperm cells. Through machine learning-based sorting, the system identifies and separates X-bearing (female) and Y-bearing (male) sperm with improved accuracy, helping couples choose the desired gender with a higher success rate.`,
      color: '#1a6c8a',
      lightColor: '#e8f4f8'
    },
    {
      id: 3,
      title: 'AI-Enhanced PGT',
      icon: 'fa-solid fa-dna',
      description: `AI-powered Preimplantation Genetic Testing (PGT) uses advanced algorithms to analyze embryos during IVF. Artificial Intelligence helps detect genetic abnormalities with higher accuracy before embryo transfer, allowing couples to reduce the risk of inherited diseases and improve overall IVF success rates.`,
      color: '#6a1a8a',
      lightColor: '#f4e8f8'
    },
    {
      id: 4,
      title: 'AI-Assisted IVF',
      icon: 'fa-solid fa-flask',
      description: `AI-assisted In Vitro Fertilization (IVF) leverages Artificial Intelligence to optimize embryo selection and monitoring in a laboratory setting. The process fertilizes eggs outside the body while AI algorithms enhance accuracy and increase the chances of a successful pregnancy.`,
      color: '#1a8a5a',
      lightColor: '#e8f8f0'
    },
    {
      id: 5,
      title: 'AI-Enhanced ICSI',
      icon: 'fa-solid fa-syringe',
      description: `AI-enhanced Intracytoplasmic Sperm Injection (ICSI) integrates Artificial Intelligence to improve precision in sperm selection and injection. A single sperm is carefully injected into an egg with AI-assisted guidance, increasing the success rate, especially in cases of severe male infertility.`,
      color: '#8a6a1a',
      lightColor: '#f8f4e8'
    },
    {
      id: 6,
      title: 'AI-Enhanced IVM',
      icon: 'fa-solid fa-cell',
      description: `AI-enhanced In Vitro Maturation (IVM) leverages Artificial Intelligence to monitor and optimize the maturation of eggs outside the body. Immature eggs retrieved from the ovaries are matured in a controlled lab environment with AI-assisted analysis, improving success rates and minimizing the need for hormonal stimulation, making it ideal for sensitive patients.`,
      color: '#8a1a4a',
      lightColor: '#f8e8f0'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}