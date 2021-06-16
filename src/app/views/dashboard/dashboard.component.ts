import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SigninService } from '../signin.service';
import {ConfirmationService} from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  text: string;
  displayModal: boolean;
  position: string;
  display_image_url : string = "assets/img/addImage.png";
  image_url : string;

  user_info: any = {0: []};
  username: string;
  todo: string;
  counter: any = 0;
  todo_list: any = [];
  todo_obj: object;
  selectedTodo: any;

  spinner_hide: boolean = false;
  news_list : Array<any> = [];

  ngOnInit(): void {    
    this.username = localStorage.getItem('username');
    this.news_get();
    this.userInfo_get();
    this.display_image_url = localStorage.getItem('image_url');
  }

  ngAfterViewInit() {
    this.todo_get();
  }
    //if (localStorage.getItem('token') === null)

  
  constructor(private _service: SigninService, 
              private confirmationService: ConfirmationService,
              private toastr: ToastrService) {
  }

  showModalDialog(position: string) {
    this.position = position;
    this.displayModal = true;
  }   

  //IMAGE 

  updateUrl() {
    this.display_image_url = this.image_url;
    this.image_url = "";
    localStorage.setItem('image_url', this.display_image_url);
  }

  //USER_INFO 
  userInfo_get() {
    this._service.editInfo_get(this.username).subscribe(      
      res => {
        this.user_info = res;
    });
  }

  //TODO
  todo_get() {
    
    this._service.todo_get(this.username).subscribe(
      res => {
        this.todo_list = res[0].todo_list.split(",");
    },
    err => {
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

  getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}
  news_get() {
    
    this._service.news_get().subscribe(
      res => {
        this.news_list = res.articles.splice(0,3);
        for (let i = 0; i < 3; i ++) {
          this.news_list[i] = this.getRandomItem(res.articles);
        }
        for (let i = 0; i < 3; i++) {

          var current = new Date().toISOString();
          this.news_list[i].publishedAt = 
              Math.floor((Date.parse(current) - Date.parse(this.news_list[i].publishedAt))/3600000);
        }
        this.spinner_hide = true;
    },
    err => {
      console.log(err);
    });
  }


}
