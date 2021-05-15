import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-js-editor',
  templateUrl: './js-editor.component.html',
  styleUrls: ['./js-editor.component.scss']
})
export class JsEditorComponent implements OnInit {

  user_code: object = {};
  text: string;
  output: string='';
  displayModal: boolean;
  Er: boolean;
  msg:Message[]




  constructor(private _service: CodeService) {   }
  post_code()
  {
    this.user_code = {code:this.text}
    this._service.editor_post(this.user_code).subscribe(
      res => {
        //console.log('in post');
        this.get_code_op();
      },
      err => {
        console.log(err);
        //this.toastr.error('Please retry!');
      }
    );
  }

  get_code_op() {
    this._service.editor_get().subscribe(
      res => {
        console.log(res);
        this.displayModal = true;
        if(res.result != null)
        {
          this.Er = false;
          this.output=res.result;
        }
        else
        {
          this.Er = true;
          this.output=res.message;
        }
    },
    err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.msg = [
      {severity:'info', summary:'Info', detail:'Please Select </> to enable the Code-block'},
    ];
  }

}
