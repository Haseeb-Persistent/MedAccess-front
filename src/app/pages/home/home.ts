import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Hero } from "../../components/hero/hero";
import { Services } from "../../components/services/services";
import { SuccessCountComponent } from "../../components/success-count/success-count.component";
import { Footer } from "../../components/footer/footer";
import { RouterModule } from "@angular/router";
import { Doctors } from '../../components/doctors/doctors';

@Component({
  selector: 'app-home',
  imports: [Hero, Services, SuccessCountComponent, Footer, RouterModule, Doctors],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
