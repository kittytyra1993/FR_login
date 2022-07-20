import { NameCallback } from '@forgerock/javascript-sdk';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fadeSlideInOut } from 'src/app/services/animations/animations';

@Component({
  selector: 'app-name-callback',
  templateUrl: './name-callback.component.html',
  styleUrls: ['./name-callback.component.scss'],
  animations: [
    fadeSlideInOut
   ]  
})
export class NameCallbackComponent implements OnInit {
  @Input() nameCallbackObject: any;
  callback: NameCallback;
  header: string;
  nameFocus = true;
  constructor() {}

  ngOnInit() {
    this.callback = this.nameCallbackObject.callbackValue;
    this.header = this.formatHeader(this.callback.getOutputValue() as string);
  }
  formatHeader(header){
    return header.replace(":", '')
  }

}
