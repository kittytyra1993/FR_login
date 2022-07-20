import { PasswordCallback } from '@forgerock/javascript-sdk';
import { Component, OnInit, Input } from '@angular/core';
import { fadeSlideInOut } from 'src/app/services/animations/animations';

@Component({
  selector: 'app-password-callback',
  templateUrl: './password-callback.component.html',
  styleUrls: ['./password-callback.component.scss'],
  animations: [
    fadeSlideInOut 
  ]
})
export class PasswordCallbackComponent implements OnInit {
  @Input() passwordCallbackObject: any;
  callback: PasswordCallback;
  @Input() header: string;
  pwdShown: boolean = false;
  pwdFocus = false;
  constructor() {}

  ngOnInit() {
    this.callback = this.passwordCallbackObject.callbackValue;
    this.header = this.formatHeader(this.callback.getOutputValue() as string);
  }
  formatHeader(header){
    return header.replace(":", '')
  }
  showPwd(){
    this.pwdShown = !this.pwdShown;
  }
}
