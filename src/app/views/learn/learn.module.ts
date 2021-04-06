import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStructuresComponent } from './data-structures/data-structures.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';

import { LearnRoutingModule } from './learn-routing.module';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [DataStructuresComponent, AlgorithmsComponent],
  imports: [
    CommonModule,
    LearnRoutingModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  ]
})
export class LearnModule { }
