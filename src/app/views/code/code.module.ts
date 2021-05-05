import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeforcesComponent } from './codeforces/codeforces.component';
import { CodeRoutingModule } from './code-routing.module';





import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [CodeforcesComponent],
  imports: [
    CommonModule,
    CodeRoutingModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    CardModule,
    ScrollPanelModule,
    TabViewModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    TagModule,
  ]
})
export class CodeModule { }
