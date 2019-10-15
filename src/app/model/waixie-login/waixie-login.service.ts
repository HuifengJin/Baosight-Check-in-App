import { Injectable } from '@angular/core';
import { EIService } from '../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../app.constants';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EI } from '../../shared/iplat4c/ei';
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {tryCatch} from 'rxjs/internal-compatibility';


@Injectable({
  providedIn: 'root'
})
export class WaixieLoginService {

  constructor(private http: HttpClient, private eiService: EIService) { }

  WXlogin(credentials, grad, start, edu): Observable<any> {
    const requestData = {
      ENAME: credentials.ENAME,
      CNAME: credentials.CNAME,
      GENDER: credentials.GENDER,
      TEL_PHONE: credentials.TEL_PHONE,
      EMAIL: credentials.EMAIL,
      ID_CARD: credentials.ID_CARD,
      DEGREE: credentials.DEGREE,
      YEAR_OF_GRADUATION: grad,
      UNIVERSITY: credentials.UNIVERSITY,
      MAJOR: credentials.MAJOR,
      PROFESSION_SKILLS: credentials.PROFESSION_SKILLS,
      NATIONALITY: credentials.NATIONALITY,
      JOB_TITLE: credentials.JOB_TITLE,
      COMPREHENSIVE_INSURANCE: credentials.COMPREHENSIVE_INSURANCE,
      INAUGURATION_DATE: start,
      OUTSOURCING_COMPANY: credentials.OUTSOURCING_COMPANY,
      USE_DEPT_ENAME: credentials.USE_DEPT_ENAME,
      SAFETY_EDU_DATE: edu,
      REC_CREATOR: credentials.REC_CREATOR,
      REC_REVISOR: credentials.REC_REVISOR,
      REC_CREATE_TIME: credentials.REC_CREATE_TIME,
      REC_REVISE_TIME: credentials.REC_REVISE_TIME
  };
  return this.eiService.callService('osUser/insertOSUsers', requestData);
}

  getDegree(): Observable<any> {
    const requestData =  {
      CODE_CLASS: 'DEGREE'
    };
    return this.eiService.callService('epCodeValue/getEPCodeValues', requestData);
  }

  getCompany(): Observable<any> {
    const requestData =  {};
    return this.eiService.callService('osCompany/getOSCompanies', requestData);
  }

  getDept(): Observable<any> {
    const requestData =  {};
    const inBlk = this.eiService.buildInBlock(requestData);
    return this.http.get(SERVER_API_RUL + 'api/' + 'group/getDepts', { observe: 'response' })
            .pipe(
                map( (response: HttpResponse<any>) => {
                    const outBlk: EI.JsonEIInfo = EI.EIInfoToJsonEIInfo(response.body);
                    return outBlk;
                })
            );
  }
}
