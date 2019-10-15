import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EIService } from '../../../shared/iplat4c/ei.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessqueryService {
  constructor(public http: HttpClient, private eiService: EIService) { }

   public httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   };
  managerList() {
    return  this.http.get('assets/api/managerList.json', this.httpOptions);
   }

   getInfo(credentials): Observable<any> {
    const requestData = {
      CNAME: credentials.CNAME,
      ENAME: credentials.ENAME,
      PM: credentials.PM
    };
    return this.eiService.callService('osUser/getOSUsers', requestData);
  }
}
