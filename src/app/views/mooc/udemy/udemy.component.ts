import { Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { MoocService } from '../mooc.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-udemy',
  templateUrl: './udemy.component.html',
  styleUrls: ['./udemy.component.scss']
})
export class UdemyComponent implements OnInit {

  courses: Courses[];
  cols: any[];
  title_obj: object;
  sidebar = false;
  position;
  resString;
  titleArray = "";
  urlArray;
  platformArray = "";
  cols_recommender: any[];
  ic : string = "pi pi-search";
  name: string = "";
  recommender_obj: any[];

  constructor( private moocService: MoocService, private toastr: ToastrService ) { }

  ngOnInit(): void {
      this.moocService.getUdemy().then(courses => {
      this.courses = courses;
    });

    this.cols = [
      { field: 'course_title', header: 'Course Title' },
      { field: 'organization', header: 'Organization'},
      { field: 'level', header: 'Level' },
      { field: 'url', header: 'URL' }
    ];

    this.cols_recommender = [
      { field: 'course_title', header: 'Course Title' },
      { field: 'platform', header: 'Platform'},
      { field: 'url', header: 'URL' }
    ];
  }

  styleObject(field): Object {
    if (field === "url" ){
        return {width: '30px'}
    }

    else if (field === 'level') {
      return {width: '60px'}
    }

    else if (field === 'course_title') {
      return {width: '150px'}
    }
    else if (field === 'organization') {
      return {width: '80px'}
    }
    return {}
  }

  styleRecommender(field): Object {
    if (field === "course_title" ){
        return {width: '140px'}
    }

    else if (field === 'url') {
      return {width: '30px'}
    }

    else if (field === 'platform') {
      return {width: '50px'}
    }

    return {}
  }

  change_ic(ic:string){
    this.ic = ic;
  }

  getRecommendation() {
    this.moocService.getRecommendation().subscribe(
      res => {
        this.ic = 'pi pi-search';
        if(res == null) {
          this.toastr.error('Sorry! No recommendations available for this course.');
        }
        else {
          this.resString = String(res).split("~");
          this.titleArray = this.resString[0].split(",");
          this.urlArray = this.resString[1].split(",");
          this.platformArray = this.resString[2].split(",");
          for(let i = 0; i < this.urlArray.length; i++) {
            this.urlArray[i] = this.urlArray[i].trim();
          }
          this.recommender_obj = [{a: this.titleArray, b: this.urlArray, c:this.platformArray}];
          this.sidebar = true;
          this.position = 'right';
        }
    },
    err => {
      console.log(err);
    });
  }

  selectTitle(course) {
    this.title_obj = {title: course.course_title};
    this.name = course.course_title;
    this.moocService.title_post(this.title_obj).subscribe(
      res => {
        this.getRecommendation();
      },
      err => {
        console.log(err);
      }
    );
  }

}
