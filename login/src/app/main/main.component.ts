import { Component, OnInit } from '@angular/core';
import { FRAuth, Config, FRStep, StepType, ChoiceCallback } from '@forgerock/javascript-sdk';
import { FRCallback, CallbackType, NameCallback, PasswordCallback } from '@forgerock/javascript-sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { fadeSlideInOut, listAnimation, fade } from '../services/animations/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
   fadeSlideInOut, fade
  ]  
})
export class MainComponent implements OnInit {
  currentStep: any;
  authnForm: FormGroup;
  btnLabel: string;

  loading = true;
  buildAuthForm: any;
  tree: any;
  nameCallbackObject = {};
  passwordCallbackObject = {};
  choiceCallbackObject = [];
  confirmationCallbackObject = {};
  user = '';
  errors: boolean;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.authnForm = fb.group({});
  }

  async ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.route.queryParams.subscribe((params) => {
      this.tree = params.service;
    });
    Config.set({
      serverConfig: { baseUrl: environment.AM_URL, timeout: 10000 },
      // tree: this.tree ? this.tree : 'TestChain',
      tree: this.tree ? this.tree : environment.DEFAULT_TREE,
      realmPath: environment.REALM_PATH,
    });
    interface CallbackObject {
      value: FormGroup;
      callback: FRCallback;
    }
    // Start authentication.
    this.nextStep(null);
  }

  /**
   *
   *
   * @param {FRStep} step
   * @returns {Promise<any>}
   * @memberof MainComponent
   */
  async handleStep(step: FRStep): Promise<any> {
    {
      // TODO: After every round of authentication, form control needs to be cleared.
      switch (step.type as StepType) {
        case StepType.Step: {
          this.buildAuthnForm(step.callbacks);
          break;
        }
        case StepType.LoginFailure: {
          this.router.navigate(['error']);
          break;
        }
        case StepType.LoginSuccess: {
          this.router.navigate(['home']);
          break;
        }
        default: {
          this.router.navigate(['error']);
          break;
        }
      }
    }
  }

  /**
   *
   *
   * @param {*} err
   * @memberof MainComponent
   */
  handleError(err: any) {
    console.error(err);
    this.router.navigate(['error']);
  }

  /**
   *
   *
   * @param {FRCallback[]} callbacks
   * @memberof MainComponent
   */
  buildAuthnForm(callbacks: FRCallback[]): void {
    let i = 0;
    callbacks.forEach((callback) => {
      i++;
      switch (callback.getType() as CallbackType) {
        case CallbackType.NameCallback: {
          const formControlGroup = 'nameCallbackForm';
          this.authnForm.addControl(
            formControlGroup,
            this.fb.group({
              nameControl: ['', Validators.required],
            })
          );
          this.nameCallbackObject = {
            callbackValue: callback,
            input: callback.getInputValue(),
            form: this.authnForm.get(formControlGroup),
          };
          break;
        }

        case CallbackType.PasswordCallback: {
          const formControlGroup = 'passwordCallbackForm';
          this.authnForm.addControl(
            formControlGroup,
            this.fb.group({
              passwordControl: ['', Validators.required],
            })
          );
          this.passwordCallbackObject = {
            callbackValue: callback,
            form: this.authnForm.get(formControlGroup),
          };
          break;
        }

        case CallbackType.ChoiceCallback: {
          const formControlGroup = 'choiceCallbackForm' + String(i);
          this.authnForm.addControl(
            formControlGroup,
            this.fb.group({
              choiceControl: ['', Validators.required],
            })
          );
          this.choiceCallbackObject.push({
            callbackValue: callback,
            form: this.authnForm.get(formControlGroup),
          });
          break;
        }

        case CallbackType.ConfirmationCallback: {
          const formControlGroup = 'confirmationCallbackForm';
          this.authnForm.addControl(
            formControlGroup,
            this.fb.group({
              confirmationControl: ['', Validators.required],
            })
          );
          this.confirmationCallbackObject = {
            callbackValue: callback,
            form: this.authnForm.get(formControlGroup),
          };
          break;
        }

        default:
          break;
      }
    });

    // Display built form.
    this.loading = false;
  }

  /**
   *
   *
   * @param {*} authnFormValue
   * @memberof MainComponent
   */
  sendStepResponse(authnFormValue: any) {
    let i = 0;
    this.currentStep.callbacks.forEach((callback) => {
      i++;
      switch (callback.getType()) {
        case CallbackType.NameCallback: {
          (callback as NameCallback).setName(authnFormValue.nameCallbackForm.nameControl);
          this.user = authnFormValue.nameCallbackForm.nameControl;
          break;
        }

        case CallbackType.PasswordCallback: {
          (callback as PasswordCallback).setPassword(authnFormValue.passwordCallbackForm.passwordControl);
          break;
        }

        case CallbackType.ChoiceCallback: {
          (callback as ChoiceCallback).setChoiceValue(
            authnFormValue['choiceCallbackForm' + String(i)]['choiceControl']
          );
          break;
        }

        default: {
          console.error('Unrecognized callback type.');
          break;
        }
      }
    });

    this.loading = true;
    // clear form and create new instance of it.
    this.authnForm.reset();
    this.authnForm = this.fb.group({});
    // clear callback objects.
    this.nameCallbackObject = {};
    this.passwordCallbackObject = {};
    this.choiceCallbackObject = [];
    this.confirmationCallbackObject = {};
    // update current step.
    this.nextStep(this.currentStep);
  }
  // }

  /**
   *
   *
   * @param {FRStep} step
   * @memberof MainComponent
   */
  async nextStep(step: FRStep) {
    this.currentStep = await FRAuth.next(step);
    this.handleStep(this.currentStep).catch(this.handleError);
  }
}
