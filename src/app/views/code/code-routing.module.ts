import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeforcesComponent } from './codeforces/codeforces.component';
import { JsEditorComponent } from './js-editor/js-editor.component';

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
      {
        path: 'js-editor',
        component: JsEditorComponent,
        data: {
          title: 'Js-Editor'
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