import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-codeforces',
  templateUrl: './codeforces.component.html',
  styleUrls: ['./codeforces.component.scss']
})
export class CodeforcesComponent implements OnInit {

  constructor(private _service: CodeService) { }
  items: any;
  activeItem: any;
  menu: any;

  ngOnInit(): void {

    this.items = [
      {label: 'Profile', icon: 'pi pi-fw pi-home'},
      {label: 'Contest Dates', icon: 'pi pi-fw pi-calendar'},
      {label: 'Editor', icon: 'pi pi-fw pi-pencil'}
  ];
  this.activeItem = this.items[0];
  }

  cf_get() {
    this._service.cf_get().subscribe(
      res => {
        console.log(res);
    },
    err => {
      console.log(err);
    });
  }



}
