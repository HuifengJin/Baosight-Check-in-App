import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { EI } from '../../shared/iplat4c/ei';
import { AlertRadioService } from './alert-radio.service';

@Component({
  selector: 'app-alert-radio',
  templateUrl: './alert-radio.component.html',
  styleUrls: ['./alert-radio.component.scss'],
})
export class AlertRadioComponent implements OnInit {
  // 接受值
  @Input() sendTotal: any;

  // 接受方法
  @Input() getSendFormChild;
  @Input() closeChild;
  @Output() private toParent = new EventEmitter();
  public showDirectorList = true;
  public showManagerList = false;
  public sendContent;
  public radioValue = {
    drcValue: '',
    manValue: ''
  };
  public headIndex = 0;
  // 开发中我们经常在ngOnInit做一些初始化的工作，而这些工作尽量要避免在constructor中进行，
  // constructor中应该只进行依赖注入而不是进行真正的业务操作
  // 然而，constructor的使用不仅限于依赖注入（DI）。举个例子，
  // @angular/router模块的router-outlet指令在路由生态系统内用constructor来注册自己和自己的位置
  // （viewContainerRef）。我在 Here is how to get ViewContainerRef before @ViewChild query is evaluated把它描述了一遍。
  // 惯例就是，在constructor中，逻辑应尽可能少。
  constructor(private ARSvs: AlertRadioService) {
    // 这里打印不出来 console.log(this.sendTotal);
  }

  ngOnInit() {
    console.log(this.sendTotal);
    this.sendContent = this.sendTotal[0].content;
    // this.radioValue.drcValue = "admin";
    this.headIndex = 0;
    console.log('111');
  }
  changeContent(i) {
    this.headIndex = i;
    this.sendTotal.forEach((item, index) => {
      if (index === i) {
        item.value = 'check';
      } else {
        item.value = 'uncheck';
      }
    });

    this.sendContent = this.sendTotal[i].content;
  }
  getDecValue(e) {
      // console.log('getDecValue:',e.detail.value);
      // this.radioValue.drcValue = e.detail.value;
  }
  getManValue(e) {
    // console.log('getManValue',e.detail.value);
    this.radioValue.manValue = e.detail.value;
  }
  confirm() {
    this.toParent.emit(this.radioValue);

  }
}
