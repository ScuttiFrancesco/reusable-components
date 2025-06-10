import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p (click)="route.navigate(['home/login'])">
      login
    </p>
  <a (click)="route.navigate(['home/register'])">register</a>


    
  `,
  styles: ``
})
export class HomeComponent {

  constructor(public route : Router){}

}
