import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() btnLabel:string;
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}
