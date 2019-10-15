import { Injectable } from '@angular/core';
import { EIService } from '../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../app.constants';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EI } from '../../shared/iplat4c/ei';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefendService {

  constructor(private http: HttpClient, private eiService: EIService) { }

  getUser(credentials): Observable<any> {
    const requestData = {
      ENAME: credentials.ENAME,
    };
    return this.eiService.callService('user/getUsers', requestData);
  }

  updateUser(credentials): Observable<any> {
    const requestData = {
      ENAME: credentials.ENAME,
      TEL_PHONE: credentials.TEL_PHONE,
      SPECIALTY: credentials.SPECIALTY
    };
    return this.eiService.callService('user/updateUser', requestData);
  }
}
