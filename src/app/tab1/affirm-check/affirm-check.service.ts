import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EIService } from '../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../app.constants';
import { EI } from '../../shared/iplat4c/ei';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffirmCheckService {

  constructor(public http: HttpClient, private eiService: EIService) { }

  public httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   };

   getAttendance(month): Observable<any> {
    const requestData = {
      MONTH: month
    };
    return this.eiService.callService('attendance/getAttendances', requestData);
  }

  updateAttendance(credentials): Observable<any> {
    const requestData = {
      STATUS: credentials.STATUS,
      ENAME: credentials.ENAME,
      MONTH: credentials.MONTH
    };
    return this.eiService.callService('attendance/updateAttendances', requestData);
  }
}
