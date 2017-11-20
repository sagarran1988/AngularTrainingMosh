import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { log } from 'util';

@Component ({
  selector: 'courses',
  template: `
    {{ course.title | uppercase | lowercase }} <br/>
    {{ course.students | number }} <br/>
    {{ course.rating | number: '1.2-2' }} <br/>
    {{ course.price | currency: 'INR': true }} <br/>
    {{ course.releaseDate | date: 'shortDate' }}

  `
})

export class CoursesComponent {
  course = {
    title: 'The Complete Angular Course',
    rating: 4.9745,
    students: 30123,
    price: 190.95,
    releaseDate: new Date(2016, 5, 1)
  };

}
