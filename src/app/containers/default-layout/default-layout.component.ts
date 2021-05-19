import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { SigninService } from '../../views/signin.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  displayModal: boolean;
  username: any='';
  
  constructor(private fb:FormBuilder,private _service: SigninService) { }

  edit_info = this.fb.group({

    first_name:[''],
    last_name:[''],
    phone:[''],
    mail_id:[''],
    country:[''],
    github:[''],
    linkedin:[''],
    website:['']
  });

  ngOnInit():void{
    this.username = localStorage.getItem('username');
  }

  showModalDialog() {
    this.displayModal = true;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  get first_name()
  {
    return this.edit_info.get('first_name');
  }

  get last_name()
  {
    return this.edit_info.get('last_name');
  }
  get country()
  {
    return this.edit_info.get('country');
  }
  get phone()
  {
    return this.edit_info.get('phone');
  }
  get github()
  {
    return this.edit_info.get('github');
  }
  get linkedin()
  {
    return this.edit_info.get('linkedin');
  }
  get website()
  {
    return this.edit_info.get('website');
  }
  get mail_id()
  {
    return this.edit_info.get('mail_id');
  }
  
  setInfo(res)
  {
    this.first_name.setValue(res.first_name);
    this.last_name.setValue(res.last_name);
    this.phone.setValue(res.phone);
    this.country.setValue(res.country);

    if(res.github!='null'){
      this.github.setValue(res.github);
    }
    else{
      this.github.setValue('');
    }
    if(res.linkedin!='null'){
      this.linkedin.setValue(res.linkedin);
    }
    else{
      this.linkedin.setValue('');
    }
    if(res.website!='null'){
      this.website.setValue(res.website);
    }
    else{
      this.website.setValue('');
    }
    this.mail_id.setValue(this.username);
  }
  

  EditInfo_get() {
    
    this._service.editInfo_get(this.username).subscribe(
      res => {
        //console.log(res[0]);
        this.setInfo(res[0]);    
    },
    err => {
      console.log(err);
    });
  }

  EditInfo_post() {
    //this.todo_obj = { username : this.username, todo_list : this.todo_list};

    this._service.editInfo_post(this.edit_info.value).subscribe(
      res => {
        console.log("success")
      },
      err => {
        console.log(err);
      }
    )
  }
}
