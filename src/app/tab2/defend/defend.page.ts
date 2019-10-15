import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { DefendService } from './defend.service';
import { EI } from '../../shared/iplat4c/ei';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-defend',
  templateUrl: './defend.page.html',
  styleUrls: ['./defend.page.scss'],
})
export class DefendPage implements OnInit {

  public user: any = {
    ENAME: this.$localStorage.retrieve('userInfo')[0].ENAME,
    TEL_PHONE: null,
    SPECIALTY: null
  };


  constructor(public router: Router, public activeRoute: ActivatedRoute, public DESvc: DefendService
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService
    , public alertController: AlertController) { }

  ngOnInit() {
    this.DESvc.getUser(this.user).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET USER!', outBlk);
          this.user.TEL_PHONE = outBlk.getTable('USER').Data[0]['TEL_PHONE'];
          this.user.SPECIALTY = outBlk.getTable('USER').Data[0]['SPECIALTY'];
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: ['确定']
    });

    await alert.present();
  }

  confirm() {
    console.log(this.user);
    this.DESvc.updateUser(this.user).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('UPDATE USER SUCCESSFULLY!', outBlk);
          this.presentAlert('维护成功！');
          this.router.navigate(['/tabs/tab2']);
        } else {
          this.presentAlert('维护失败！');
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

  Back() {
    this.router.navigate(['/tabs/tab2']);
  }

}
