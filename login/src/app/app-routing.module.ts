import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BaseComponent } from './view/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'home',
    data: { message: 'home' },
    component: BaseComponent,
  },
  {
    path: 'error',
    data: { message: 'error' },
    component: BaseComponent,
  },
  {
    path: 'logout',
    data: { message: 'logout' },
    component: BaseComponent,
  },
  {
    path: 'not-found',
    data: { message: 'not-found' },
    component: BaseComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
