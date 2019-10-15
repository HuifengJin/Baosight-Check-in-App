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
export class ManagerService {
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

  getUserInfo(credentials): Observable<any> {
    const requestData = {
      ENAME: credentials.ENAME,
      CNAME: credentials.CNAME,
      USE_DEPT_ENAME: credentials.USE_DEPT_ENAME,
      STATUS: credentials.STATUS
    };
    return this.eiService.callService('osUser/getOSUsers', requestData);
  }

  getDept(): Observable<any> {
    const requestData =  {};
    return this.eiService.callService('group/getGroups', requestData);
  }

  getStatus(): Observable<any> {
    const requestData =  {
      CODE_CLASS: 'STATUS'
    };
    return this.eiService.callService('epCodeValue/getEPCodeValues', requestData);
  }

  getCompany(): Observable<any> {
    const requestData =  {};
    return this.eiService.callService('osCompany/getOSCompanies', requestData);
  }

  getUseType(): Observable<any> {
    const requestData =  {
      CODE_CLASS: 'USE_TYPE'
    };
    return this.eiService.callService('epCodeValue/getEPCodeValues', requestData);
  }
}
