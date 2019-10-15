import { Injectable } from '@angular/core';
import { EIService } from '../../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../../app.constants';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EI } from '../../../shared/iplat4c/ei';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssessContentService {

  constructor(private http: HttpClient, private eiService: EIService) { }

  getAssessInfo(ename, month): Observable<any> {
    const requestData = {
      ENAME: ename,
      MONTH: month
    };
    return this.eiService.callService('assess/getAssesses', requestData);
  }

  insertAssess(credentials): Observable<any> {
    const requestData = {
      CNAME: credentials.CNAME,
      ENAME: credentials.ENAME,
      PROJECT_NO: credentials.PROJECT_NO,
      PROJECT_NAME: credentials.PROJECT_NAME,
      USE_CNAME: credentials.USE_CNAME,
      SCORE: credentials.SCORE,
      ABSENT_DAYS: credentials.ABSENT_DAYS,
      ABSENT_REASON: credentials.ABSENT_REASON,
      ARCHIVE_FLAG: credentials.ARCHIVE_FLAG,
      NOTE: credentials.NOTE,
      USE_TYPE: credentials.USE_TYPE,
      USE_EGOOD_AT_SKILLSNAME: credentials.GOOD_AT_SKILLS,
      PARTICIPATION_MODULE: credentials.PARTICIPATION_MODULE,
      USE_START_DATE: credentials.USE_START_DATE,
      EXPECTED_USE_END_DATE: credentials.EXPECTED_USE_END_DATE,
      IS_ASSESS: credentials.IS_ASSESS,
      MONTH: credentials.MONTH,
      PM: credentials.PM,
      WORK_SKILL: credentials.WORK_SKILL,
      WORK_ATTITUDE: credentials.WORK_ATTITUDE,
      WORK_LOAD: credentials.WORK_LOAD,
      WORK_QUALITY: credentials.WORK_QUALITY,
      REC_REVISOR: credentials.REC_REVISOR,
      REC_REVISE_TIME: credentials.REC_REVISE_TIME,
      REC_CREATOR: credentials.REC_CREATOR,
      REC_CREATE_TIME: credentials.REC_CREATE_TIME
    };
    return this.eiService.callService('assess/insertAssesses', requestData);
  }

  updateAssess(credentials): Observable<any> {
    const requestData = {
      CNAME: credentials.CNAME,
      ENAME: credentials.ENAME,
      PROJECT_NO: credentials.PROJECT_NO,
      PROJECT_NAME: credentials.PROJECT_NAME,
      USE_CNAME: credentials.USE_CNAME,
      SCORE: credentials.SCORE,
      ABSENT_DAYS: credentials.ABSENT_DAYS,
      ABSENT_REASON: credentials.ABSENT_REASON,
      ARCHIVE_FLAG: credentials.ARCHIVE_FLAG,
      NOTE: credentials.NOTE,
      USE_TYPE: credentials.USE_TYPE,
      USE_EGOOD_AT_SKILLSNAME: credentials.GOOD_AT_SKILLS,
      PARTICIPATION_MODULE: credentials.PARTICIPATION_MODULE,
      USE_START_DATE: credentials.USE_START_DATE,
      EXPECTED_USE_END_DATE: credentials.EXPECTED_USE_END_DATE,
      IS_ASSESS: credentials.IS_ASSESS,
      MONTH: credentials.MONTH,
      PM: credentials.PM,
      WORK_SKILL: credentials.WORK_SKILL,
      WORK_ATTITUDE: credentials.WORK_ATTITUDE,
      WORK_LOAD: credentials.WORK_LOAD,
      WORK_QUALITY: credentials.WORK_QUALITY,
      REC_REVISOR: credentials.REC_REVISOR,
      REC_REVISE_TIME: credentials.REC_REVISE_TIME,
      REC_CREATOR: credentials.REC_CREATOR,
      REC_CREATE_TIME: credentials.REC_CREATE_TIME
    };
    return this.eiService.callService('assess/updateAssesses', requestData);
  }
}
