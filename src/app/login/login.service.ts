import { Injectable } from '@angular/core';
import { EIService } from '../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../app.constants';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EI } from '../shared/iplat4c/ei';
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {tryCatch} from 'rxjs/internal-compatibility';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public userInfo: any;
    public userRouter: any;

  // 手动设置请求类型
  public httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };
  constructor(private http: HttpClient, private eiService: EIService,
    private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
   }
   /*
   Login(user){
    return this.http.post(this.loginUrl,user,this.httpOptions);
   }*/

   login(credentials): Observable<any> {
    const requestData = {
        userName: credentials.username,
        password: credentials.password,
        rememberMe: true
    };
    const inBlock = this.eiService.buildInBlock(requestData); // 返回EIInfo
    return this.http.post(SERVER_API_RUL + 'api/authenticate', inBlock, { observe: 'response' })
        .pipe(
            map( (response: HttpResponse<any>) => {
                const bearerToken = response.headers.get('Authorization');
                if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                    const jwt = bearerToken.slice(7, bearerToken.length);
                    this.storeAuthenticationToken(jwt, true);
                }
                const outBlk: EI.JsonEIInfo = EI.EIInfoToJsonEIInfo(response.body);
                console.log(outBlk);
                this.userInfo = outBlk.getTable('USER').Data;
                this.userRouter = outBlk.getTable('ROUTER').Data;
                this.storeUser(this.userInfo, this.userRouter, true);
                return outBlk;
            })
        );
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.$localStorage.clear('authenticationToken');
            this.$localStorage.clear('userInfo');
            this.$localStorage.clear('userRouter');
            this.$sessionStorage.clear('authenticationToken');
            this.$sessionStorage.clear('userInfo');
            this.$sessionStorage.clear('userRouter');
            observer.complete();
        });
    }

    storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            this.$localStorage.store('authenticationToken', jwt);
        } else {
            this.$sessionStorage.store('authenticationToken', jwt);
        }
    }

    storeUser(info, route, rememberMe) {
        if (rememberMe) {
            this.$localStorage.store('userInfo', info);
            this.$localStorage.store('userRouter', route);
        } else {
            this.$sessionStorage.store('userInfo', info);
            this.$sessionStorage.store('userRouter', route);
        }
    }


}
