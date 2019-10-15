import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-assessquery-content',
  templateUrl: './assessquery-content.page.html',
  styleUrls: ['./assessquery-content.page.scss'],
})
export class AssessqueryContentPage implements OnInit {

  public InfoArray: any;

  public condition = {
    ENAME: '',
    CNAME: '',
    PROJECT_NO: '',
    PROJECT_NAME: '',
    USE_CNAME: '',
    SCORE: '',
    GRADE: '',
    ABSENT_DAYS: '',
    ABSENT_REASON: ''
  };

  constructor(public activeRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(res => {
      console.log('route param:', res);
      this.InfoArray = res;
      console.log('infoarray', this.InfoArray);
      this.condition.ENAME = this.InfoArray.ENAME;
      this.condition.CNAME = this.InfoArray.CNAME;
      this.condition.PROJECT_NO = this.InfoArray.PROJECT_NO;
      this.condition.PROJECT_NAME = this.InfoArray.PROJECT_NAME;
      this.condition.USE_CNAME = this.InfoArray.USE_CNAME;
      this.condition.SCORE = this.InfoArray.SCORE;
      this.condition.ABSENT_DAYS = this.InfoArray.ABSENT_DAYS;
      this.condition.ABSENT_REASON = this.InfoArray.ABSENT_REASON;
      this.setGrade(this.condition.SCORE);
      console.log(this.condition);
    });
  }

  setGrade(n) {
    if (n >= 90 && n <= 100) {
      this.condition.GRADE = 'A';
    } else if (n >= 80 && n <= 89) {
      this.condition.GRADE = 'B';
    } else if (n >= 70 && n <= 79) {
      this.condition.GRADE = 'C';
    } else if (n >= 60 && n <= 69) {
      this.condition.GRADE = 'D';
    } else if (n < 60) {
      this.condition.GRADE = 'E';
    }

  }

}
