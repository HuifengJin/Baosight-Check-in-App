import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { UpdateService } from './update.service';
import { EI } from '../../shared/iplat4c/ei';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  public user: any = {
    ENAME:  this.$localStorage.retrieve('userInfo')[0].ENAME,
    PASSWORD: '',
    newPASSWORD: ''
  };

  constructor(public router: Router, public activeRoute: ActivatedRoute, public alertController: AlertController
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService
    , public UPSvc: UpdateService) { }

  ngOnInit() {
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
    if (this.user.PASSWORD === this.user.newPASSWORD) {
      this.UPSvc.updateUser(this.user).subscribe(
        (outBlk: EI.JsonEIInfo) => {
          if (outBlk.SysInfo.Flag === 0) {
            console.log('CHANGE PASSWORD SUCCESSFULLY!', outBlk);
            this.presentAlert('密码修改成功！');
            this.router.navigate(['/tabs/tab2']);
          } else {
            this.presentAlert('密码修改失败！');
          }
          console.log(outBlk);
      },
      err => {
        console.log(err);
      }
      );
    } else {
      this.presentAlert('两次输入的密码不一致，请重新输入');
      this.user.password = '';
      this.user.newPassword = '';
    }

  }

  Back() {
    this.router.navigate(['/tabs/tab2']);
  }



}
