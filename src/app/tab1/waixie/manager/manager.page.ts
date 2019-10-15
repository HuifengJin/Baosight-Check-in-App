import { WaixieLoginComponent } from './../../../model/waixie-login/waixie-login.component';
import { ModalController } from '@ionic/angular';
import { Tab1Service } from './../../tab1.service';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from './manager.service';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { EI } from '../../../shared/iplat4c/ei';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {

  public DeptArray: any[] = [];
  public CompArray: any[] = [];
  public UseTypeArray: any[] = [];
  public status: any[] = [];
  public queryFlag = false;
  public dept;
  public gender;
  public company;
  public useType;


  public condition: any = {
    ENAME: '',
    CNAME: '',
    USE_DEPT_ENAME: '',
    STATUS: ''
  };

  customPopoverOptions: any = {
    message: '只可以选择一种状态哦'
  };
  public managerList;
  public homelist;
  public detailUrl;

  // 是否释放
  public releaseFlag = false;

  constructor(public manSvc: ManagerService, public router: Router,
    public activeRoute: ActivatedRoute, public homeSvc: Tab1Service, public modalController: ModalController) {
   }

   ionViewWillEnter() {

    this.managerList = [];

    if (this.queryFlag) {
      this.manSvc.getUserInfo(this.condition).subscribe(
        (outBlk: EI.JsonEIInfo) => {
          if (outBlk.SysInfo.Flag === 0) {
            console.log('get userinfo successfully');
          }
          console.log('getUserInfo', outBlk);
          this.managerList = outBlk.getTable('Table0').Data;
      },
      err => {
        console.log(err);
      }
      );
      }

   }

   ngOnInit() {
     this.homelist = this.homeSvc.getWaixieItem();
     console.log(this.homelist);

     this.detailUrl = this.homelist.serfDetail;
     console.log(this.detailUrl);

     // get dept table
    this.manSvc.getDept().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET DEPT!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.DeptArray.push({CODE: element['DEPT_ENAME'], NAME: element['DEPT_CNAME']});
          });
          console.log('DEPT ARE:', this.DeptArray);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get status table
    this.manSvc.getStatus().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET STATUS!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.status.push({value: element['CODE_DESC_2_CONTENT'], desc: element['CODE_DESC_1_CONTENT']});
          });
          console.log('STATUS ARE:', this.status);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get company table
    this.manSvc.getCompany().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET COMPANY!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.CompArray.push({CODE: element['OUTSOURCING_COMPANY_CODE'], NAME: element['OUTSOURCING_COMPANY_NAME']});
          });
          console.log('COMPANY ARE:', this.CompArray);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get use type table
    this.manSvc.getUseType().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET USE TYPE!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.UseTypeArray.push({CODE: element['CODE_DESC_2_CONTENT'], NAME: element['CODE_DESC_1_CONTENT']});
          });
          console.log('USE TYPE ARE:', this.UseTypeArray);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: WaixieLoginComponent,
      componentProps: { value: 123 }
    });
     await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }
  query() {
    this.queryFlag = true;
    console.log(this.condition);
    if (this.queryFlag) {
    this.manSvc.getUserInfo(this.condition).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get userinfo successfully');
        }
        console.log('getUserInfo', outBlk);
        this.managerList = outBlk.getTable('Table0').Data;
    },
    err => {
      console.log(err);
    }
    );
    }
  }

  goDetail(item) {
    this.DeptArray.forEach(element => {
      if (element['NAME'] === item.USE_DEPT_ENAME) {
        this.dept = element['CODE'];
      }
    });
    if (item.GENDER === '男') {
      this.gender = 'M';
    } else if (item.GENDER === '女') {
      this.gender = 'F';
    } else {
      this.gender = '';
    }
    this.CompArray.forEach(element => {
      if (element['NAME'] === item.OUTSOURCING_COMPANY) {
        this.company = element['CODE'];
      }
    });
    this.UseTypeArray.forEach(element => {
      if (element['NAME'] === item.USE_TYPE) {
        this.useType = element['CODE'];
      }
    });
    // this.router = this.activeRoute['_routerState'].snapshot.url;
    const routerParams: NavigationExtras  = {
      queryParams: {
          // nowRouter: this.router,
          ENAME: item.ENAME,
          CNAME: item.CNAME,
          GENDER: this.gender,
          TEL_PHONE: item.TEL_PHONE,
          EMAIL: item.EMAIL,
          ID_CARD: item.ID_CARD,
          DEGREE: item.DEGREE,
          YEAR_OF_GRADUATION: item.YEAR_OF_GRADUATION,
          UNIVERSITY: item.UNIVERSITY,
          MAJOR: item.MAJOR,
          PROJECT_NO: item.PROJECT_NO,
          PROJECT_NAME: item.PROJECT_NAME,
          USE_ENAME: item.USE_ENAME,
          EXPECTED_USE_END_DATE: item.EXPECTED_USE_END_DATE,
          NATIONALITY: item.NATIONALITY,
          PROFESSION_SKILLS: item.PROFESSION_SKILLS,
          JOB_TITLE: item.JOB_TITLE,
          COMPREHENSIVE_INSURANCE: item.COMPREHENSIVE_INSURANCE,
          INAUGURATION_DATE: item.INAUGURATION_DATE,
          SAFETY_EDU_DATE: item.SAFETY_EDU_DATE,
          OUTSOURCING_COMPANY: this.company,
          USE_DEPT_ENAME: this.dept,
          PARTICIPATION_MODULE: item.PARTICIPATION_MODULE,
          GOOD_AT_SKILLS: item.GOOD_AT_SKILLS,
          LATEST_EVALUATION: item.LATEST_EVALUATION,
          USE_START_DATE: item.USE_START_DATE,
          USE_TYPE: this.useType
      }
  };
    console.log('route:', routerParams);
    this.router.navigate(['/manager/' + this.detailUrl], routerParams);
  // 梁颖看到是外协信息维护
  // 经理看到是外协管理
  // this.router.navigate(['/manager/'+this.detailUrl],{queryParams:item});
  }
}
