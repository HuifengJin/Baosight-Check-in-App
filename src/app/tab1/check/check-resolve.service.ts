import { Injectable } from '@angular/core';
import { Router, Resolve, } from '@angular/router';
import { map } from 'rxjs/operators';
import { CheckService } from './check.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CheckResolveService implements Resolve<any>  {

  public user = {
    ENAME: this.$localStorage.retrieve('userInfo')[0].ENAME
  };
  public month = this.datePipe.transform(new Date(), 'yyyyMM');

  constructor(
    public service: CheckService,
    public router: Router,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private datePipe: DatePipe
  ) {
  }

  resolve() {
    console.log(this.user, this.month);
    return this.service.getAttendance(this.user, this.month)
      .pipe(map(response => {
        if (response.SysInfo.Flag === 0) {
            return response;
        } else {
          return [];
        }
      }));
  }
}
