
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public username = this.$localStorage.retrieve('userInfo')[0].CNAME;
  public ENAME = this.$localStorage.retrieve('userInfo')[0].ENAME;

  constructor(public router: Router, public route: ActivatedRoute
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {

  }

  goDefend() {
    // 这种办法也同理，行不通   relativeTo允许从当前激活的路由进行相对导航。
    // this.router.navigate(['defend'],{relativeTo: this.route});
    this.router.navigate(['tabs/tab2/defend']);
  }
  goUpdate() {
    this.router.navigateByUrl('tabs/tab2/update');
  }



}
