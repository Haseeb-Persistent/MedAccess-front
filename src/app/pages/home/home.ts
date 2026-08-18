import { Component, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Hero } from "../../components/hero/hero";
import { Services } from "../../components/services/services";
import { Footer } from "../../components/footer/footer";
import { RouterModule } from "@angular/router";
import { AosService } from '../../services/aos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
   standalone: true,
  imports: [Hero, Services, Footer, RouterModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
 constructor(private aosService: AosService) {}

  ngOnInit(): void {
    // Refresh AOS when component loads
    setTimeout(() => {
      this.aosService.refreshAOS();
    }, 200);
  }
}
