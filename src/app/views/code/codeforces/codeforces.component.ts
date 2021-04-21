import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-codeforces',
  templateUrl: './codeforces.component.html',
  styleUrls: ['./codeforces.component.scss']
})
export class CodeforcesComponent implements OnInit {

  constructor(private _service: CodeService) { }

  ngOnInit(): void {
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
