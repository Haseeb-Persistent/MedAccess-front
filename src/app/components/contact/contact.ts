import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "../header/header";

@Component({
  selector: 'app-contact',
  imports: [RouterModule, Header],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

}
