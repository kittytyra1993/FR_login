import { Component, OnInit, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-password-callback',
  templateUrl: './password-callback.component.html',
  styleUrls: ['./password-callback.component.sass']
})
export class PasswordCallbackComponent implements OnInit {

  @Input() passwordCallback_Form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
