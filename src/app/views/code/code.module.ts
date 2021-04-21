import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeforcesComponent } from './codeforces/codeforces.component';
import { CodeRoutingModule } from './code-routing.module';


@NgModule({
  declarations: [CodeforcesComponent],
  imports: [
    CommonModule,
    CodeRoutingModule
  ]
})
export class CodeModule { }
