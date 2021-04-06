import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataStructuresComponent } from './data-structures/data-structures.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Learn'
    },
    children: [
      {
        path: '',
        redirectTo: 'data-structures'
      },
      {
        path: 'data-structures',
        component: DataStructuresComponent,
        data: {
          title: 'Data Structures'
        }
      },
      {
        path: 'algorithms',
        component: AlgorithmsComponent,
        data: {
          title: 'Algorithms'
        }
      }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule {}
