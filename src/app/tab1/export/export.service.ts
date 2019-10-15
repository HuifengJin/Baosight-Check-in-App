import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EIService } from '../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../app.constants';
import { map } from 'rxjs/operators';
import { EI } from '../../shared/iplat4c/ei';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(public http: HttpClient, private eiService: EIService) { }
   public httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   };

   getDept(): Observable<any> {
    const requestData =  {
      CODE_CLASS: 'DEPT'
    };
    return this.eiService.callService('epCodeValue/getEPCodeValues', requestData);
  }

   getGroup(dept): Observable<any> {
    const requestData =  {
      DEPT_ENAME: dept
    };
    return this.eiService.callService('group/getGroups', requestData);
  }

  findAtt(credentials, month): Observable<any> {
    const requestData =  {
      DEPT_ENAME: credentials.DEPT_ENAME,
      GROUP_ENAME: credentials.GROUP_ENAME,
      MONTH: month,
      STATUS: credentials.STATUS
    };
    return this.eiService.callService('attendance/getAttendances', requestData);
  }
}
