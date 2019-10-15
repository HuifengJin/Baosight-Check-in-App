import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EIService } from '../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../app.constants';
import { EI } from '../../shared/iplat4c/ei';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor(public http: HttpClient, private eiService: EIService) { }

  public httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   };

  getAttendance(credentials, month): Observable<any> {
    const requestData = {
      ENAME: credentials.ENAME,
      MONTH: month
    };
    return this.eiService.callService('attendance/getAttendances', requestData);
  }

  insertBusinessTrip(credentials, month): Observable<any>  {
    const requestData = {
      ENAME: credentials.ENAME,
      START_DATE: credentials.START_DATE,
      END_DATE: credentials.END_DATE,
      ATTENDANCE_TYPE: credentials.ATTENDANCE_TYPE,
      MONTH: month
    };
    return this.eiService.callService('attendance/insertAttendances', requestData);
  }

  insertHoliday(credentials, month): Observable<any>  {
    const requestData = {
      ENAME: credentials.ENAME,
      START_DATE: credentials.START_DATE,
      END_DATE: credentials.END_DATE,
      ATTENDANCE_TYPE: credentials.ATTENDANCE_TYPE,
      MONTH: month
    };
    return this.eiService.callService('attendance/insertAttendances', requestData);
  }

}
