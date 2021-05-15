import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SigninService } from '../signin.service';
import {ConfirmationService} from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  cols : any;
  text: string;
  displayModal: boolean;
  position: string;

  username: string;
  todo: string;
  counter: any = 0;
  todo_list: any = [];
  todo_obj: object;
  selectedTodo: any;

  ngOnInit(): void {    
    this.username = localStorage.getItem('username');
    
  }

  ngAfterViewInit() {
    this.todo_get();
  }
    //if (localStorage.getItem('token') === null)

  
  constructor(private _service: SigninService, 
              private confirmationService: ConfirmationService,
              private toastr: ToastrService) {

                this.cols = [
                  { field: 'name', header: 'Name' },
                  { field: 'rating', header: 'Difficulty'},
                  { field: 'tags', header: 'Tags' }
                ];
  }

  showModalDialog(position: string) {
    this.position = position;
    this.displayModal = true;
  }   


  //TODO
  todo_get() {
    
    this._service.todo_get(this.username).subscribe(
      res => {
        this.todo_list = res[0].todo_list.split(",");
    },
    err => {
      console.log(err);
    });
  }

  todo_push() {
    this.todo_list.push(this.todo);
    this.todo_post();
  }

  toast(){
    this.toastr.success('Note added!');
  }

  todo_post() {
    this.todo_obj = { username : this.username, todo_list : this.todo_list};
    this._service.todo_post(this.todo_obj).subscribe(
      res => {
        this.todo_get();
        this.todo = '';
      },
      err => {
        console.log(err);
      }
    )
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.todo_delete();
            this.toastr.info('Note deleted!');
        },
        reject: () => {
            //reject action
        }
    });
}

  todo_delete() {
    let index = this.todo_list.indexOf(this.selectedTodo);
    if (index > -1) {
      this.todo_list.splice(index,1);
    }
    this.todo_post();
  }

  //NEWS
  news_get() {
    
    this._service.news_get().subscribe(
      res => {
        console.log(res);
    },
    err => {
      console.log(err);
    });
  }


}
