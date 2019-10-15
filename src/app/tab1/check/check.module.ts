import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// 引入日历
import { CalendarModule } from 'ion2-calendar';

import { IonicModule } from '@ionic/angular';

import { CheckPage } from './check.page';
import { CheckResolveService } from './check-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: CheckPage,
    resolve: {
      data: CheckResolveService,
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckPage],
  entryComponents: []
})
export class CheckPageModule {}
