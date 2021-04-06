import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-data-structures',
  templateUrl: './data-structures.component.html',
  styleUrls: ['./data-structures.component.scss'],
})
export class DataStructuresComponent implements OnInit {

  @ViewChild('LLModal') public LLModal: ModalDirective;
  @ViewChild('ArrayModal') public ArrayModal: ModalDirective;
  @ViewChild('StackModal') public StackModal: ModalDirective;
  @ViewChild('QueueModal') public QueueModal: ModalDirective;
  @ViewChild('TreeModal') public TreeModal: ModalDirective;
  @ViewChild('MapModal') public MapModal: ModalDirective;
  @ViewChild('GraphModal') public GraphModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

}
