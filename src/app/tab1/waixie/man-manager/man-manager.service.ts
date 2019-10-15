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
export class ManManagerService {

  constructor(private http: HttpClient, private eiService: EIService) { }

  practice(credentials, date1, date2): Observable<any> {
    const requestData = {
      STATUS: credentials.STATUS,
      ENAME: credentials.ENAME,
      CNAME: credentials.CNAME,
      PROJECT_NO: credentials.PROJECT_NO,
      PROJECT_NAME: credentials.PROJECT_NAME,
      USE_ENAME: credentials.USE_ENAME,
      EXPECTED_USE_END_DATE: date1,
      USE_TYPE: credentials.USE_TYPE,
      PARTICIPATION_MODULE: credentials.PARTICIPATION_MODULE,
      GOOD_AT_SKILLS: credentials.GOOD_AT_SKILLS,
      LATEST_EVALUATION: credentials.LATEST_EVALUATION,
      USE_START_DATE: date2,
      REC_REVISOR: credentials.REC_REVISOR,
      REC_REVISE_TIME: credentials.REC_REVISE_TIME
    };
    return this.eiService.callService('osUser/updateOSUsers', requestData);
  }

  release(credentials): Observable<any> {
    const requestData = {
      ENAME: credentials.ENAME,
      CNAME: credentials.CNAME,
      STATUS: credentials.STATUS,
      RELEASE_USE_DATE: credentials.RELEASE_USE_DATE,
      USE_ENAME: credentials.USE_ENAME,
      PM: credentials.PM,
      PD: credentials.PD,
      REC_REVISOR: credentials.REC_REVISOR,
      REC_REVISE_TIME: credentials.REC_REVISE_TIME
    };
    return this.eiService.callService('osUser/updateOSUsers', requestData);
  }

  getUseType(): Observable<any> {
    const requestData =  {
      CODE_CLASS: 'USE_TYPE'
    };
    return this.eiService.callService('epCodeValue/getEPCodeValues', requestData);
  }

}
