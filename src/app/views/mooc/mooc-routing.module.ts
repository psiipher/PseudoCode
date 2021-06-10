import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdemyComponent } from './udemy/udemy.component';
import { VerifyCertComponent } from './verify-cert/verify-cert.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'MOOC'
    },
    children: [
      {
        path: '',
        redirectTo: 'udemy'
      },
      {
        path: 'udemy',
        component: UdemyComponent,
        data: {
          title: 'udemy'
        }
      },
      {
        path: 'verify-cert',
        component: VerifyCertComponent,
        data: {
          title: 'verify-cert'
        }
      },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoocRoutingModule {}