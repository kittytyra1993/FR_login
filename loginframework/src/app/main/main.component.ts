import { Component, OnInit } from '@angular/core';
import { FRAuth, Config, FRStep } from '@forgerock/javascript-sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  currentStep: any;
  authnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.authnForm = formBuilder.group({
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    Config.set({
      serverConfig: { baseUrl: 'https://am01-dev.pwcinternal.com:8443/openam', timeout: 500 },
      tree: 'LDAPChain',
      realmPath: 'root/pwc'
    });
    this.authenticate(null);
  }

  async authenticate(previousStep): Promise<any> {
    {
      this.currentStep = await FRAuth.next(previousStep);
      // TODO: Implement proper catch block)
      console.log(this.currentStep.type);
      switch(this.currentStep.type){
        case 'Step':
          {
            this.buildauthnForm(this.currentStep.callbacks);
            break;
          }
        case 'LoginFailure':
          {
            this.router.navigate(['500']);
            break;
          }
        case 'LoginSuccess':
          {
            this.router.navigate(['home']);
            break;
          }
        default:
          {
            this.router.navigate(['500']);
            break;
          }
      }
      
    }
    // TODO: After every round of authentication, form control needs to be cleared.
  }

  buildauthnForm(callbacks: any): void {
    let formBuilderObject = {};
    for (let callback of callbacks) {
      let formControlName = callback['payload']['type'] + '_Input';
      let formControlGroup = callback['payload']['type'] + "_Form";
      this.authnForm.addControl(formControlGroup, this.formBuilder.group({
        formControlName: ['', Validators.required]
        // TODO: Modify names of the formcontrols to something meaningful instead of formControlName.
      }));
    }
  }

  nextStep(authnFormValue: any) {
    this.buildResponse(authnFormValue)
    this.authenticate(this.currentStep);
    // TODO: Clear currentstep
  }

  buildResponse(authnFormValue: any){
    for (let callback of this.currentStep.callbacks){
      console.log(authnFormValue);
      callback.setInputValue(authnFormValue[callback.getType() + '_Form']['formControlName']);
    }
  }

}
