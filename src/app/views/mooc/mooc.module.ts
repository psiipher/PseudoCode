import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdxComponent } from './edx/edx.component';

import { MoocRoutingModule } from './mooc-routing.module';
import { VerifyCertComponent } from './verify-cert/verify-cert.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ModalModule } from 'ngx-bootstrap/modal';

import {CardModule} from 'primeng/card';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import {ButtonModule} from 'primeng/button';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [EdxComponent, VerifyCertComponent],
  imports: [
    CommonModule,
    MoocRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CardModule,
    DialogModule,
    SelectButtonModule,
    InputTextModule,
    TagModule,
    ToastrModule.forRoot(),
    ButtonModule,
    
    
  ]
})
export class MoocModule { }
