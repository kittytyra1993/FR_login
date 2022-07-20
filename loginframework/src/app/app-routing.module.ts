import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './view/home/home.component'
import { Error500Component } from './view/error500/error500.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '500',
    component: Error500Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
