import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeforcesComponent } from './codeforces/codeforces.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Code'
    },
    children: [
      {
        path: '',
        redirectTo: 'codeforces'
      },
      {
        path: 'codeforces',
        component: CodeforcesComponent,
        data: {
          title: 'codeforces'
        }
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule {}