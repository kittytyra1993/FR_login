import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { FRCallback, ChoiceCallback } from '@forgerock/javascript-sdk/lib';
import { fadeSlideInOut } from 'src/app/services/animations/animations';


@Component({
  selector: 'app-choice-callback',
  templateUrl: './choice-callback.component.html',
  styleUrls: ['./choice-callback.component.scss'],
  animations: [
    fadeSlideInOut
  ]
})
export class ChoiceCallbackComponent implements OnInit {
  @Input() choiceCallbackObject: any;
  header: string;
  callback: ChoiceCallback;
  prompt: string;
  choices: any;
  permanentChoices: any;
  defaultChoice: any;
  choiceForm: FormGroup;
  selected: boolean; 
  totalChoices: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.callback = this.choiceCallbackObject.callbackValue;
    this.header = this.callback.getOutputValue() as string;
    this.choiceForm = this.choiceCallbackObject.form;
    this.prompt = this.callback.getOutputValue('prompt') as string;
    this.choices = this.callback.getOutputValue('choices');
    this.defaultChoice = this.callback.getOutputValue('defaultChoice');

    this.choiceForm.addControl('choiceControl', this.fb.control(this.choices[this.defaultChoice], Validators.required));

  }
//   onChanges() {
//     this.choiceForm.get('choiceControl').valueChanges
//     .subscribe(selectedChoice => {
//         if (selectedChoice.includes('@')) {
//             this.choiceForm.get('choiceControl').disable();
//         }
//         // else {
//         //     this.choiceForm.get('state').enable();
//         // }
//     });
// }

  setValue(selectedValue) {
    this.choiceForm.controls.choiceControl.markAsDirty();

    this.choiceForm.controls.choiceControl.setValue(selectedValue);
    this.choices.forEach(option => {
        if(this.choiceForm.controls.choiceControl.value.includes('@')){
          this.selected = true;
        }    
    });
  }
  removeValue(){
    this.choiceForm.controls.choiceControl.markAsDirty();
    this.selected = !this.selected;
    this.choiceForm.controls.choiceControl.setValue('');

  }

}
