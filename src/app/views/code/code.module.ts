import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeforcesComponent } from './codeforces/codeforces.component';
import { CodeRoutingModule } from './code-routing.module';
import {EditorModule} from 'primeng/editor';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {MessagesModule} from 'primeng/messages';




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
import { JsEditorComponent } from './js-editor/js-editor.component';

@NgModule({
  declarations: [CodeforcesComponent, JsEditorComponent],
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
    EditorModule,
    InputTextareaModule,
    TooltipModule,
    MessagesModule
  ]
})
export class CodeModule { }
