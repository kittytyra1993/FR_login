import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-callback',
  templateUrl: './confirmation-callback.component.html',
  styleUrls: ['./confirmation-callback.component.scss'],
})
export class ConfirmationCallbackComponent implements OnInit {
  @Input() confirmationCallbackObject: any;

  constructor() {}

  ngOnInit() {

  }
}
