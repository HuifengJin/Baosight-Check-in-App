import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EIService } from '../shared/iplat4c/ei.service';
import { EI } from '../shared/iplat4c/ei';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class Tab1Service {
  private waixieList; 
  private waixieItem; 
  constructor(public http: HttpClient,private eiService: EIService) { }
  // 本地json文件请求
  getRequestContact(){
    return  this.http.get<{result: string}>("assets/api/homeMenu.json");
  }
  getkaoqinAll(){
    return  this.http.get<{result: string}>("assets/api/kaoqin.json");
  }
  getwaixie(){
    return  this.http.get<{result: string}>("assets/api/waixie.json");
  }
  setWaixielist(item){
    // this.waixieList = list;
    this.waixieItem = item;
  }
  getWaixielist(){
    return this.waixieList;
  }
  getWaixieItem(){
    return this.waixieItem;
  }
  getUsers(): Observable<any> { // , private loginService: LoginService
    const inBlock = new EI.EIInfo();
    return this.eiService.callService('user/getUsers', inBlock);
}
}
