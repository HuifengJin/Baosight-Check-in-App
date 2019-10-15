import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EIService } from '../../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../../app.constants';
import { map } from 'rxjs/operators';
import { EI } from '../../../shared/iplat4c/ei';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessService {
  constructor(public http: HttpClient, private eiService: EIService) { }
   // 手动设置请求类型
   public httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   };
  managerList() {
    //  this.http.post(this.loginUrl,this.httpOptions).subscribe((res)=>{
    //     return res;
    //  },(err)=>{
    //     return err;
    //  });
    return  this.http.get('assets/api/managerList.json', this.httpOptions);
   }

   getUserInfo(credentials, month): Observable<any> {
    const requestData = {
      CNAME: credentials.CNAME,
      USE_ENAME: credentials.USE_ENAME,
      PROJECT_NAME: credentials.PROJECT_NAME,
      MONTH: month
    };
    return this.eiService.callService('osUser/getOSUsers', requestData);
  }



}
