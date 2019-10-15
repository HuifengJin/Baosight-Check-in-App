import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController  } from '@ionic/angular';
import { AlertradiocardComponent } from './../../../component/alertradiocard/alertradiocard.component';
import { DatePipe } from '@angular/common';
import { EI } from '../../../shared/iplat4c/ei';
import { ManDrcService } from './man-drc.service';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-man-drc',
  templateUrl: './man-drc.page.html',
  styleUrls: ['./man-drc.page.scss'],
})
export class ManDrcPage implements OnInit {

  public InfoArray;
  public DegreeArray: any[] = [];
  public CompanyArray: any[] = [];
  public DeptArray: any[] = [];
  public gradT: any;
  public startT: any;
  public eduT: any;

  public time = new Date();

  public condition: any = {
    ENAME: '',
    CNAME: '',
    GENDER: '',
    TEL_PHONE: '',
    EMAIL: '',
    ID_CARD: '',
    DEGREE: '',
    YEAR_OF_GRADUATION: '',
    UNIVERSITY: '',
    MAJOR: '',
    PROFESSION_SKILLS: '',
    NATIONALITY: '',
    JOB_TITLE: '',
    COMPREHENSIVE_INSURANCE: '',
    INAUGURATION_DATE: '',
    OUTSOURCING_COMPANY: '',
    USE_DEPT_ENAME: '',
    SAFETY_EDU_DATE: '',
    REC_CREATOR: '',
    REC_REVISOR: this.$localStorage.retrieve('userInfo')[0].CNAME,
    REC_CREATE_TIME: this.datePipe.transform(this.time, 'yyyyMMddHHmmss'),
    REC_REVISE_TIME: this.datePipe.transform(this.time, 'yyyyMMddHHmmss'),
    STATUS:  ''
  };
  customPopoverOptions: any = {
    message: '只可以选择一种状态哦'
  };
  backdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;
  public showFadeIn = false;
  public showAlertCard = false;
  public sendTotal = [{
    value: 'check',
    desc: '项目总监',
    content: []
  }, {
    value: 'uncheck',
    desc: '项目经理',
    content: []
  }];
  public drcContent: any[] = [];
  public manContent: any[] = [];
  constructor(public router: Router, public activeRoute: ActivatedRoute, public alertController: AlertController
    , public modalController: ModalController, private datePipe: DatePipe, private MDSvs: ManDrcService
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
    this.sendTotal[0].content = this.drcContent;
    this.sendTotal[1].content = this.manContent;
   }
   async presentModal() {
    const modal = await this.modalController.create({
      component: AlertradiocardComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
  ngOnInit() {
    this.activeRoute.queryParams.subscribe(res => {
      console.log('route param:', res);
      this.InfoArray = res;
      console.log('infoarray', this.InfoArray);
      this.condition.ENAME = this.InfoArray.ENAME;
      this.condition.CNAME = this.InfoArray.CNAME;
      this.condition.GENDER = this.InfoArray.GENDER;
      this.condition.TEL_PHONE = this.InfoArray.TEL_PHONE;
      this.condition.EMAIL = this.InfoArray.EMAIL;
      this.condition.ID_CARD = this.InfoArray.ID_CARD;
      this.condition.DEGREE = this.InfoArray.DEGREE;
      if (this.InfoArray.YEAR_OF_GRADUATION !== ' ') {
      this.condition.YEAR_OF_GRADUATION = this.InfoArray.YEAR_OF_GRADUATION.slice(0, 4) + '-' +
      this.InfoArray.YEAR_OF_GRADUATION.slice(4, 6);
      console.log(this.condition.YEAR_OF_GRADUATION); }
      this.condition.UNIVERSITY = this.InfoArray.UNIVERSITY;
      this.condition.MAJOR = this.InfoArray.MAJOR;
      this.condition.PROFESSION_SKILLS = this.InfoArray.PROFESSION_SKILLS;
      this.condition.NATIONALITY = this.InfoArray.NATIONALITY;
      this.condition.JOB_TITLE = this.InfoArray.JOB_TITLE;
      this.condition.COMPREHENSIVE_INSURANCE = this.InfoArray.COMPREHENSIVE_INSURANCE;
      if (this.InfoArray.INAUGURATION_DATE !== ' ') {
      this.condition.INAUGURATION_DATE = this.InfoArray.INAUGURATION_DATE.slice(0, 4) + '-' +
      this.InfoArray.INAUGURATION_DATE.slice(4, 6) + '-' + this.InfoArray.INAUGURATION_DATE.slice(6, 8); }
      this.condition.OUTSOURCING_COMPANY = this.InfoArray.OUTSOURCING_COMPANY;
      this.condition.USE_DEPT_ENAME = this.InfoArray.USE_DEPT_ENAME;
      if (this.InfoArray.SAFETY_EDU_DATE !== ' ') {
      this.condition.SAFETY_EDU_DATE = this.InfoArray.SAFETY_EDU_DATE.slice(0, 4) + '-' +
      this.InfoArray.SAFETY_EDU_DATE.slice(4, 6) + '-' + this.InfoArray.SAFETY_EDU_DATE.slice(6, 8); }
      console.log(this.condition);
    });

    // get PM
    this.MDSvs.getPM().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET PM!', outBlk);
          outBlk.getTable('USER').Data.forEach(element => {
            this.manContent.push({desc: element['CNAME'], value: element['ENAME']});
          });
          console.log('PM ARE:', this.manContent);
        } else {
          this.presentAlert('FAIL TO GET PM' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get PD
    this.MDSvs.getPD().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET PD!', outBlk);
          outBlk.getTable('USER').Data.forEach(element => {
            this.drcContent.push({desc: element['CNAME'], value: element['ENAME']});
          });
          console.log('PD ARE:', this.drcContent);
        } else {
          this.presentAlert('FAIL TO GET PD' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get degree table
    this.MDSvs.getDegree().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET DEGREE!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            for (const key of Object.keys(element)) {
              if (key === 'CODE_DESC_1_CONTENT') {
                this.DegreeArray.push(element[key]);
              }
            }
          });
          console.log('DEGREE ARE:', this.DegreeArray);
        } else {
          this.presentAlert('FAIL TO GET DEGREE：' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get company table
    this.MDSvs.getCompany().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET COMPANY!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.CompanyArray.push({CODE: element['OUTSOURCING_COMPANY_CODE'], NAME: element['OUTSOURCING_COMPANY_NAME']});
          });
          console.log('COMPANY ARE:', this.CompanyArray);
        } else {
          this.presentAlert('FAIL TO GET COMPANY' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get dept table
    this.MDSvs.getDept().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET DEPT!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.DeptArray.push({CODE: element['DEPT_ENAME'], NAME: element['DEPT_CNAME']});
          });
          console.log('DEPT ARE:', this.DeptArray);
        } else {
          this.presentAlert('FAIL TO GET DEPT' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }
// 简单弹框
async presentAlert(msg) {
  const alert = await this.alertController.create({
    header: '提示',
    message: msg,
    buttons: ['确定']
  });

  await alert.present();
}

// 类似于actionsheet
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }
// 确认弹框
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '确认',
      message: '是否确认 <strong>修改</strong>!!!',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('Confirm Okay');
            this.gradT = this.datePipe.transform(this.condition.YEAR_OF_GRADUATION, 'yyyyMM');
            this.startT = this.datePipe.transform(this.condition.INAUGURATION_DATE, 'yyyyMMdd');
            this.eduT = this.datePipe.transform(this.condition.SAFETY_EDU_DATE, 'yyyyMMdd');
            this.MDSvs.modify(this.condition, this.gradT, this.startT, this.eduT).subscribe(
              (outBlk: EI.JsonEIInfo) => {
                if (outBlk.SysInfo.Flag === 0) {
                  this.presentAlert('修改成功！');
                  console.log('waixie modify succeeded');
                } else {
                  this.presentAlert('修改失败：' + outBlk.SysInfo.Msg);
                }
                console.log(outBlk);
            },
            err => {
              this.presentAlert('修改失败！');
              console.log(err);
            }
            );
          }
        }
      ]
    });

    await alert.present();
  }
// 表单弹框  Prompt提示
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '注销日期',
      inputs: [
        {
          name: 'name5',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确认',
          handler: (res) => {
            console.log('Confirm Ok');
            console.log(this.datePipe.transform(res.name5, 'yyyyMMdd'));
            this.condition.STATUS = '9';
            this.MDSvs.leave(this.condition, this.datePipe.transform(res.name5, 'yyyyMMdd')).subscribe(
              (outBlk: EI.JsonEIInfo) => {
                if (outBlk.SysInfo.Flag === 0) {
                  this.presentAlert('注销成功！');
                  console.log('leave succeeded');
                } else {
                  this.presentAlert('注销失败：' + outBlk.SysInfo.Msg);
                }
                console.log(outBlk);
            },
            err => {
              this.presentAlert('注销失败！');
              console.log(err);
            }
            );
          }
        }
      ]
    });

    await alert.present();
  }
// 单选弹框
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Radio 1',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Radio 2',
          value: 'value2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Radio 3',
          value: 'value3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Radio 4',
          value: 'value4'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Radio 5',
          value: 'value5'
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
// 多选弹框
  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      header: 'Checkbox',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1',
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Checkbox 2',
          value: 'value2'
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3'
        },

        {
          name: 'checkbox4',
          type: 'checkbox',
          label: 'Checkbox 4',
          value: 'value4'
        },

        {
          name: 'checkbox5',
          type: 'checkbox',
          label: 'Checkbox 5',
          value: 'value5'
        },

        {
          name: 'checkbox6',
          type: 'checkbox',
          label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
  send() {
    this.showFadeIn = true;
    this.showAlertCard = true;
  }

  ionBackdropTap() {
    console.log('false');
    this.showFadeIn = false;
    this.showAlertCard = false;
  }
  getSendFormChild(sendObj) {
      console.log(sendObj);
  }
  closeChild() {
    // 此时this指向子组件
    this.showFadeIn = false;
    this.showAlertCard = false;
  }
  runParent(e) {
    console.log('got info from child', e);
    this.MDSvs.distribute(this.condition, e).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          this.presentAlert('分配成功！');
          console.log('managers distribute succeeded');
        } else {
          this.presentAlert('分配失败：' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      this.presentAlert('分配失败！');
      console.log(err);
    }
    );
    this.closeChild();
  }
}
