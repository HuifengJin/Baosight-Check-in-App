import { Component } from '@angular/core';
import { Tab1Service } from './tab1.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { EI } from '../shared/iplat4c/ei';
import { LoginService } from '../login/login.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public today = new Date();
  public username = this.$localStorage.retrieve('userInfo')[0].CNAME;
  public homeData: any;
  public kaoqianAll: any;
  public waixie: any;
  constructor(public homeSvc: Tab1Service, public router: Router, private loginService: LoginService
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {

  }
  ionViewDidEnter() {
    console.log('ionViewDidLoad GroupPage');
    this.getRequestContact();
  }
  getRequestContact() {
    // 考勤
    this.homeSvc.getRequestContact()
    .subscribe(res => {
      this.homeData = res;
      console.log(this.homeData);

    }, error => {
      console.log(error);
    });
    // 考勤全
    this.homeSvc.getkaoqinAll()
    .subscribe(res => {
      this.kaoqianAll = res;
      console.log(this.kaoqianAll);

    }, error => {
      console.log(error);
    });
    // 外协
    this.homeSvc.getwaixie()
    .subscribe(res => {
      this.waixie = res;
      console.log(this.waixie);

    }, error => {
      console.log(error);
    });
  }
  goDetail(sref, item) {
    console.log(sref);
    this.homeSvc.setWaixielist(item);
    console.log(item);
  //   let queryParams:NavigationExtras = {
  //     queryParams:{
  //       id:1,
  //     name:'吕拉拉'
  //   },
  //   fragment:'anchor'
  // };
  this.router.navigate(['/' + sref]);

  // this.router.navigateByUrl('/manager',{queryParams:{'name':'yxman'}});
  // this.router.navigateByUrl("/"+sref,{queryParams:{'name':'yxman'}});
    // this.router.navigateByUrl("/"+sref,{queryParams:{productId: '1',title: 'moon'}});
  }
  ScrollEnd(e) {
console.log(e);
  }

  logScrolling(e) {
    console.log(e.detail.scrollTop);
    const el = document.querySelector('ion-segment');
    if (e.detail.scrollTop > 129) {
      el.style.setProperty('position', 'fixed');
      el.style.setProperty('top', '0');
      el.style.setProperty('z-index', '20');
      console.log(el);
    } else if (e.detail.scrollTop <= 129) {
      el.style.setProperty('position', 'static');
      el.style.setProperty('top', '0');
    }
  }

  queryUser(): void {
    this.homeSvc.getUsers().subscribe(
        (outBlock: EI.JsonEIInfo) => {
          console.log(outBlock);
        },
        err => {
          console.log(err);
        });
  }

  logout(): void {
     this.loginService.logout().subscribe();
  }
}
