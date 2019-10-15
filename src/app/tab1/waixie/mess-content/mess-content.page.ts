import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EI } from '../../../shared/iplat4c/ei';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-mess-content',
  templateUrl: './mess-content.page.html',
  styleUrls: ['./mess-content.page.scss'],
})
export class MessContentPage implements OnInit {

  public InfoArray;

  public condition: any = {
    CNAME: '',
    COMPREHENSIVE_INSURANCE: '',
    DEGREE: '',
    EMAIL: '',
    ENAME: '',
    EXPECTED_USE_END_DATE: '',
    GENDER: '',
    GOOD_AT_SKILLS: '',
    ID_CARD: '',
    INAUGURATION_DATE: '',
    JOB_TITLE: '',
    LATEST_EVALUATION: '',
    MAJOR: '',
    NATIONALITY: '',
    OUTSOURCING_COMPANY: '',
    PARTICIPATION_MODULE: '',
    PD: '',
    PM: '',
    PROFESSION_SKILLS: '',
    PROJECT_NAME: '',
    PROJECT_NO: '',
    RELEASE_USE_DATE: '',
    RESIGNATION_DATE: '',
    SAFETY_EDU_DATE: '',
    STATUS: '',
    TEL_PHONE: '',
    UNIVERSITY: '',
    USE_DEPT_ENAME: '',
    USE_ENAME: '',
    USE_START_DATE: '',
    USE_TYPE: '',
    YEAR_OF_GRADUATION: ''
  };

  constructor(public router: Router, public activeRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(res => {
      console.log('route param:', res);
      this.InfoArray = res;
    console.log(this.InfoArray);
      this.condition.ENAME = this.InfoArray.ENAME;
      this.condition.CNAME = this.InfoArray.CNAME;
      this.condition.GENDER = this.InfoArray.GENDER;
      this.condition.TEL_PHONE = this.InfoArray.TEL_PHONE;
      this.condition.EMAIL = this.InfoArray.EMAIL;
      this.condition.ID_CARD = this.InfoArray.ID_CARD;
      this.condition.DEGREE = this.InfoArray.DEGREE;
      if (this.InfoArray.YEAR_OF_GRADUATION !== ' ') {
      this.condition.YEAR_OF_GRADUATION = this.InfoArray.YEAR_OF_GRADUATION.slice(0, 4) + '-' +
      this.InfoArray.YEAR_OF_GRADUATION.slice(4, 6);
      console.log(this.condition.YEAR_OF_GRADUATION); }
      this.condition.UNIVERSITY = this.InfoArray.UNIVERSITY;
      this.condition.MAJOR = this.InfoArray.MAJOR;
      this.condition.PROFESSION_SKILLS = this.InfoArray.PROFESSION_SKILLS;
      this.condition.NATIONALITY = this.InfoArray.NATIONALITY;
      this.condition.JOB_TITLE = this.InfoArray.JOB_TITLE;
      this.condition.COMPREHENSIVE_INSURANCE = this.InfoArray.COMPREHENSIVE_INSURANCE;
      if (this.InfoArray.INAUGURATION_DATE !== ' ') {
      this.condition.INAUGURATION_DATE = this.InfoArray.INAUGURATION_DATE.slice(0, 4) + '-' +
      this.InfoArray.INAUGURATION_DATE.slice(4, 6) + '-' + this.InfoArray.INAUGURATION_DATE.slice(6, 8); }
      this.condition.OUTSOURCING_COMPANY = this.InfoArray.OUTSOURCING_COMPANY;
      this.condition.USE_DEPT_ENAME = this.InfoArray.USE_DEPT_ENAME;
      if (this.InfoArray.SAFETY_EDU_DATE !== ' ') {
      this.condition.SAFETY_EDU_DATE = this.InfoArray.SAFETY_EDU_DATE.slice(0, 4) + '-' +
      this.InfoArray.SAFETY_EDU_DATE.slice(4, 6) + '-' + this.InfoArray.SAFETY_EDU_DATE.slice(6, 8); }
      this.condition.PD = this.InfoArray.PD;
      this.condition.PM = this.InfoArray.PM;
      this.condition.PROJECT_NO = this.InfoArray.PROJECT_NO;
      this.condition.PROJECT_NAME = this.InfoArray.PROJECT_NAME;
      this.condition.USE_ENAME = this.InfoArray.USE_ENAME;
      this.condition.USE_TYPE = this.InfoArray.USE_TYPE;
      this.condition.PARTICIPATION_MODULE = this.InfoArray.PARTICIPATION_MODULE;
      this.condition.GOOD_AT_SKILLS = this.InfoArray.GOOD_AT_SKILLS;
      if (this.InfoArray.USE_START_DATE !== ' ') {
        this.condition.USE_START_DATE = this.InfoArray.USE_START_DATE.slice(0, 4) + '-' +
        this.InfoArray.USE_START_DATE.slice(4, 6) + '-' + this.InfoArray.USE_START_DATE.slice(6, 8); }
      if (this.InfoArray.EXPECTED_USE_END_DATE !== ' ') {
        this.condition.EXPECTED_USE_END_DATE = this.InfoArray.EXPECTED_USE_END_DATE.slice(0, 4) + '-' +
        this.InfoArray.EXPECTED_USE_END_DATE.slice(4, 6) + '-' + this.InfoArray.EXPECTED_USE_END_DATE.slice(6, 8); }
      if (this.InfoArray.RELEASE_USE_DATE !== ' ') {
        this.condition.RELEASE_USE_DATE = this.InfoArray.RELEASE_USE_DATE.slice(0, 4) + '-' +
        this.InfoArray.RELEASE_USE_DATE.slice(4, 6) + '-' + this.InfoArray.RELEASE_USE_DATE.slice(6, 8); }
      this.condition.STATUS = this.InfoArray.STATUS;
      this.condition.LATEST_EVALUATION = this.InfoArray.LATEST_EVALUATION;
      if (this.InfoArray.RESIGNATION_DATE !== ' ') {
        this.condition.RESIGNATION_DATE = this.InfoArray.RESIGNATION_DATE.slice(0, 4) + '-' +
        this.InfoArray.RESIGNATION_DATE.slice(4, 6) + '-' + this.InfoArray.RESIGNATION_DATE.slice(6, 8); }
    });
  }

}
