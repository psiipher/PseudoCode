import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdxComponent } from './edx/edx.component';
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
        redirectTo: 'edx'
      },
      {
        path: 'edx',
        component: EdxComponent,
        data: {
          title: 'edx'
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