import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-codeforces',
  templateUrl: './codeforces.component.html',
  styleUrls: ['./codeforces.component.scss']
})
export class CodeforcesComponent implements OnInit {

  displayBasic: boolean;
  handle_name: string;
  handle_name_obj: object;
  tag: any;
  profile_hide: boolean = true;

  tag_list: any;
  problem_obj: object = {};
  cols: any[];

  constructor(private _service: CodeService) { 
    this.tag_list = [
      {name:"implementation"}, 
      {name:"math"}, 
      {name:"greedy"}, 
      {name:"dp"}, 
      {name: "data structures"}, 
      {name:"brute force"},
      {name: "constructive algorithms"}, 
      {name: "graphs"}, 
      {name: "sortings"}, 
      {name: "binary search"}, 
      {name:"dfs and similar"},
      {name: "trees"}, 
      {name:"strings"}, 
      {name:"number theory"}, 
      {name:"combinatorics"},
      {name:"geometry"}, 
      {name:"bitmasks"},
      {name:"two pointers"},
      {name:"dsu"},
      {name:"shortest paths"},
      {name:"probabilities"},
      {name:"divide and conquer"},
      {name:"hashing"},
      {name:"games"},
      {name:"flows"},
      {name:"interactive"},
      {name:"matrices"},
      {name:"string suffix structures"},
      {name:"fft"},
      {name:"graph matchings"},
      {name:"ternary search"},
      {name:"expression parsing"},
      {name:"meet-in-the-middle"},
      {name:"2-sat"},
      {name:"chinese remainder theorem"},
      {name:"schedules"}
    ]
  }

  ngOnInit(): void {
    this.displayBasic = true;

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'rating', header: 'Difficulty'},
      { field: 'tags', header: 'Tags' },
      { field: 'link', header: 'Link'}
    ];
  }

  handle_info = {
    firstName : '',
    lastName : '',
    country: '',
    lastOnlineTimeSeconds : '',
    city : '',
    rating : '',
    friendOfCount : '',
    titlePhoto : '',
    handle : '',
    contribution : '',
    organization : '',
    rank : '',
    maxRating : '',
    registrationTimeSeconds : '',
    maxRank : ''
  }

  //USER PROFILE

  handleName_post() {
    this.handle_name_obj = {handle_name : this.handle_name};
    this._service.handleName_post(this.handle_name_obj).subscribe(
      res => {
        this.cf_get();
      },
      err => {
        console.log(err);
      }
    )
  }

  convert_time(unix_time) {
    var date = new Date(unix_time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();  
    var seconds = "0" + date.getSeconds();
    var hour_time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return hour_time;
  }

  cf_get() {
    this._service.cf_get().subscribe(
      res => {
        this.profile_hide = false;
        this.handle_info = res.result[0];
        this.handle_info.lastOnlineTimeSeconds = this.convert_time(this.handle_info.lastOnlineTimeSeconds);
        console.log("Success");
    },
    err => {
      console.log(err);
    });
  }

  //PROBLEMS


  problems_get() {
    this._service.problems_get().subscribe(
      res => {
        this.problem_obj = res.result;
    },
    err => {
      console.log(err);
    });
  }

  problems_post() {
    console.log(this.tag);
    this._service.problems_post(this.tag).subscribe(
      res => {
        this.problems_get();
      },
      err => {
        console.log(err);
      }
    )
  }


}

// contest.list *
// contest.standings *
// problemset.problems * 
// user.blogEntries *
// user.rating *
// user.status 

// https://www.npmjs.com/package/react-profiles#
