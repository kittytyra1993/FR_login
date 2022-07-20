import { Component, OnInit, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-name-callback',
  templateUrl: './name-callback.component.html',
  styleUrls: ['./name-callback.component.sass']
})
export class NameCallbackComponent implements OnInit {

  @Input() nameCallback_Form: FormGroup;

  constructor() { }

  ngOnInit() {
  }
}
