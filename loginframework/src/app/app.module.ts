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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NameCallbackComponent,
    PasswordCallbackComponent,
    HomeComponent,
    Error500Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule //For all the reactive forms.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
