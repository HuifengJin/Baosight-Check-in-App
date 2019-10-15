import { Component, OnInit } from '@angular/core';
// import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { EI } from '../shared/iplat4c/ei';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user:any = {
    username:'',
    password:""
  };

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {
    // const el = document.querySelector('ion-content');
    
    // el.style.setProperty('animation', 'colorchange 25s ease-out infinite;');
    // console.log(el.style);
    // el.style.setProperty('background-size', '400% 400%');
  }
  /*
  postData(){
    // this.loginSvc.Login(this.user).subscribe((res) => {
    //   console.log(res)
    // });
    this.router.navigate(['/tabs']) //跳转到tabs
    // this.router.navigateRoot('/tabs/tab1');
  }*/

  login() {
    this.loginService.login(this.user).subscribe(
        (outBlk: EI.JsonEIInfo) => {
            if (outBlk.SysInfo.Flag === 0) {
                this.router.navigateByUrl('/tabs/tab1');
            }
            console.log(outBlk);
        },
        err => {
          console.log(err);
        }
    );
  }

}
