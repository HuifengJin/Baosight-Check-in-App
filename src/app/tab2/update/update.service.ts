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
export class UpdateService {

  constructor(private http: HttpClient, private eiService: EIService) { }

  updateUser(credentials): Observable<any> {
    const requestData = {
      ENAME: credentials.ENAME,
      PASSWORD: credentials.PASSWORD
    };
    return this.eiService.callService('user/updateUser', requestData);
  }
}
