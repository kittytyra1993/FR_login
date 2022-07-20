import { Component, OnInit, Input, NgZone } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('popOverState', [
      state('loading', style({
        opacity: 1
      })),
      state('!loading', style({
        opacity: 0
      }))
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() loading;
  constructor() { }

  ngOnInit() {
    
  }


  ngOnChanges(){
  }

  loadingChanges(loading){
    this.loading = !loading;

  }
}
