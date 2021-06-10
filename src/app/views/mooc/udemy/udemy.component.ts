import { Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { MoocService } from '../mooc.service';

@Component({
  selector: 'app-udemy',
  templateUrl: './udemy.component.html',
  styleUrls: ['./udemy.component.scss']
})
export class UdemyComponent implements OnInit {

  courses: Courses[];
  constructor( private moocService: MoocService ) { }

  ngOnInit(): void {

    this.moocService.getCourses().then(courses => {
      this.courses = courses;
      console.log(this.courses);
  });
  }

}
