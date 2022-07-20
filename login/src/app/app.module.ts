import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NameCallbackComponent } from './callbacks/name-callback/name-callback.component';
import { PasswordCallbackComponent } from './callbacks/password-callback/password-callback.component';
import { HomeComponent } from './view/home/home.component';
import { Error500Component } from './view/error500/error500.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { ChoiceCallbackComponent } from './callbacks/choice-callback/choice-callback.component';
import { ConfirmationCallbackComponent } from './callbacks/confirmation-callback/confirmation-callback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from './view/base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NameCallbackComponent,
    PasswordCallbackComponent,
    HomeComponent,
    Error500Component,
    FooterComponent,
    HeaderComponent,
    CardComponent,
    ButtonComponent,
    ChoiceCallbackComponent,
    ConfirmationCallbackComponent,
    BaseComponent,
    AutoFocusDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // For all the reactive forms.
    HttpClientModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
