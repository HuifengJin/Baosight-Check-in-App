import { Component, OnInit } from '@angular/core';
import { Tab1Service } from './../../tab1.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MessqueryService } from './messquery.service';
import { EI } from '../../../shared/iplat4c/ei';
@Component({
  selector: 'app-messquery',
  templateUrl: './messquery.page.html',
  styleUrls: ['./messquery.page.scss'],
})
export class MessqueryPage implements OnInit {
  public condition: any = {
    ENAME: '',
    CNAME: '',
    PM: ''
  };
  public messList;
  public detailUrl: string;
  constructor(public MQSvc: MessqueryService, public homeSvc: Tab1Service, public router: Router
    , public activeRoute: ActivatedRoute) { }

  ngOnInit() {

  }
  query() {
    this.MQSvc.getInfo(this.condition).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get info successfully');
          console.log(outBlk);
          this.messList = outBlk.getTable('Table0').Data;
        }
        console.log('getInfo', outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

  goDetail(item) {

    const routerParams: NavigationExtras  = {
      queryParams: {
        CNAME: item.CNAME,
        COMPREHENSIVE_INSURANCE: item.COMPREHENSIVE_INSURANCE,
        DEGREE: item.DEGREE,
        EMAIL: item.EMAIL,
        ENAME: item.ENAME,
        EXPECTED_USE_END_DATE: item.EXPECTED_USE_END_DATE,
        GENDER: item.GENDER,
        GOOD_AT_SKILLS: item.GOOD_AT_SKILLS,
        ID_CARD: item.ID_CARD,
        INAUGURATION_DATE: item.INAUGURATION_DATE,
        JOB_TITLE: item.JOB_TITLE,
        LATEST_EVALUATION: item.LATEST_EVALUATION,
        MAJOR: item.MAJOR,
        NATIONALITY: item.NATIONALITY,
        OUTSOURCING_COMPANY: item.OUTSOURCING_COMPANY,
        PARTICIPATION_MODULE: item.PARTICIPATION_MODULE,
        PD: item.PD,
        PM: item.PM,
        PROFESSION_SKILLS: item.PROFESSION_SKILLS,
        PROJECT_NAME: item.PROJECT_NAME,
        PROJECT_NO: item.PROJECT_NO,
        RELEASE_USE_DATE: item.RELEASE_USE_DATE,
        RESIGNATION_DATE: item.RELEASE_USE_DATE,
        SAFETY_EDU_DATE: item.SAFETY_EDU_DATE,
        STATUS: item.STATUS,
        TEL_PHONE: item.TEL_PHONE,
        UNIVERSITY: item.UNIVERSITY,
        USE_DEPT_ENAME: item.USE_DEPT_ENAME,
        USE_ENAME: item.USE_ENAME,
        USE_START_DATE: item.USE_START_DATE,
        USE_TYPE: item.USE_TYPE,
        YEAR_OF_GRADUATION: item.YEAR_OF_GRADUATION
      }
  };

    this.router.navigate(['/messquery/mess-content'], routerParams);
    }

}
