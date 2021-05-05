import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeforcesComponent } from './codeforces/codeforces.component';
import { CodeRoutingModule } from './code-routing.module';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';





@NgModule({
  declarations: [CodeforcesComponent],
  imports: [
    CommonModule,
    CodeRoutingModule,
    CardModule,
    TabViewModule,
    
  ]
})
export class CodeModule { }
