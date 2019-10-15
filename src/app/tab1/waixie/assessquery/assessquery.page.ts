import { Component, OnInit } from '@angular/core';
import { Tab1Service } from './../../tab1.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AssessqueryService } from './assessquery.service';
import { DatePipe } from '@angular/common';
import { EI } from '../../../shared/iplat4c/ei';
// import * as XLSX from 'xlsx';


@Component({
  selector: 'app-assessquery',
  templateUrl: './assessquery.page.html',
  styleUrls: ['./assessquery.page.scss'],
})
export class AssessqueryPage implements OnInit {

  public month: any;
  public exportArray: any[];
  public fileName: string;
  public date = this.datePipe.transform(new Date(), 'yyyy-MM');

  public condition: any = {
    ENAME: '',
    CNAME: '',
    PM: '',
    MONTH: ''
  };
  public assList;
  public detailUrl: string;
  constructor(public assSvc: AssessqueryService, public homeSvc: Tab1Service, public router: Router
    , public activeRoute: ActivatedRoute, private datePipe: DatePipe) {
      this.condition.MONTH = new Date();
      console.log(this.condition.MONTH);
     }

  ngOnInit() {


    /* this.detailUrl = this.homeSvc.getWaixieItem().serf;
    console.log(this.detailUrl); */
  }
  query() {
    this.month = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
    this.assSvc.getAssessInfo(this.condition, this.month).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get assessinfo successfully');
          console.log(outBlk);
          this.assList = outBlk.getTable('Table0').Data;
          if (this.assList !== undefined) {
            console.log('enter asslist');
          this.assList.forEach(user => {
            user.GRADE = this.setGrade(user.SCORE);
            console.log('user:', user);
          });
          }
        }
        console.log('getAssessInfo', outBlk);
    },
    err => {
      console.log(err);
    }
    );
    /*
    this.assSvc.managerList().subscribe((res)=>{
      this.assList = res;
      console.log(this.assList);
   },(err)=>{
    console.log(err);
   });*/
  }

  goDetail(item) {
    // let params={
    //   item:item,
    //   from:this.detailUrl
    // }
    // item.from=this.detailUrl
    // 梁颖看到是外协信息维护
    // 经理看到是外协管理
    // this.router.navigate(['/assess/assessContent'],{queryParams:item});

    const routerParams: NavigationExtras  = {
      queryParams: {
          ENAME: item.ENAME,
          CNAME: item.CNAME,
          PROJECT_NO: item.PROJECT_NO,
          PROJECT_NAME: item.PROJECT_NAME,
          USE_CNAME: item.USE_CNAME,
          SCORE: item.SCORE,
          ABSENT_DAYS: item.ABSENT_DAYS,
          ABSENT_REASON: item.ABSENT_REASON,
          // MONTH: this.month
      }
  };

    this.router.navigate(['/assessquery/assessquery-content'], routerParams);
    }
    setGrade(n) {
      if (n >= 90 && n <= 100) {
        return 'A';
      } else if (n >= 80 && n <= 89) {
        return 'B';
      } else if (n >= 70 && n <= 79) {
        return 'C';
      } else if (n >= 60 && n <= 69) {
        return 'D';
      } else if (n < 60) {
        return 'E';
      }
    }

    export() {
      this.month = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
      this.assSvc.export(this.condition, this.month).subscribe(
        response => this.downLoadFile(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ));
    }

    downLoadFile(data: any, type: string) {
      const blob = new Blob([data.data], { type: type });
      const url = window.URL.createObjectURL(blob);

      const element = document.createElement('a');
      element.href = url;
      element.download = data.fileName;
      document.body.appendChild(element);
      element.click();
      // const pwa = window.open(url);
      /* if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
      } */
    }
}
