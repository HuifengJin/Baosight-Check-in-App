import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EIService } from '../../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../../app.constants';
import { map } from 'rxjs/operators';
import { EI } from '../../../shared/iplat4c/ei';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessqueryService {
  constructor(public http: HttpClient, private eiService: EIService) { }
  // 手动设置请求类型
  public httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };



  managerList() {
    //  this.http.post(this.loginUrl,this.httpOptions).subscribe((res)=>{
    //     return res;
    //  },(err)=>{
    //     return err;
    //  });
    return this.http.get('assets/api/managerList.json', this.httpOptions);
  }

  getAssessInfo(credentials, month): Observable<any> {
    const requestData = {
      CNAME: credentials.CNAME,
      ENAME: credentials.ENAME,
      PM: credentials.PM,
      MONTH: month
    };
    return this.eiService.callService('assess/getAssesses', requestData);
  }

  export(credentials, month): Observable<any> {
    const requestData = {
      CNAME: credentials.CNAME,
      ENAME: credentials.ENAME,
      PM: credentials.PM,
      MONTH: month
    };
    const inBlock = this.eiService.buildInBlock(requestData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post(SERVER_API_RUL + '/api/assess/exportExcel', inBlock , {
        responseType: 'blob', headers: headers, observe: 'response'
      }
    ).pipe(
      map( response => {
        const data = {
          data: response.body,
          fileName : month + '信息化本部外协人员工作评价信息表.xlsx'
        };
      return data;
  }));

  }


}
