import { Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { MoocService } from '../mooc.service';

@Component({
  selector: 'app-coursera',
  templateUrl: './coursera.component.html',
  styleUrls: ['./coursera.component.scss']
})
export class CourseraComponent implements OnInit {

  courses: Courses[];
  cols: any[];
  constructor( private moocService: MoocService ) { }

  ngOnInit(): void {
    this.moocService.getCoursera().then(courses => {
      this.courses = courses;
      console.log(this.courses);
    });

    this.cols = [
      { field: 'course_title', header: 'Course Title' },
      { field: 'organization', header: 'Organization'},
      { field: 'level', header: 'Level' },
      { field: 'url', header: 'URL' }
  ];
  }

  styleObject(field): Object {
    if (field === "url" ){
        return {width: '50px'}
    }

    else if (field === 'level') {
      return {width: '80px'}
    }

    else if (field === 'course_title') {
      return {width: '180px'}
    }
    else if (field === 'organization') {
      return {width: '100px'}
    }
    return {}
  }

}
