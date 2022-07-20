import { Component } from '@angular/core';
import { fadeAnimation } from './services/animations/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ 
    fadeAnimation
  ]
})
export class AppComponent {
  title = 'login';
  
  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
