import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { InquireDetailPage } from './../inquire-detail/inquire-detail.page';

import { IonicModule } from '@ionic/angular';

import { InquirePage } from './inquire.page';
import { CalendarModule } from 'ion2-calendar';

const routes: Routes = [
  {
    path: '',
    component: InquirePage
  },
  {
    path: 'inquire-detail',
    component: InquireDetailPage
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
  declarations: [InquirePage,InquireDetailPage]
})
export class InquirePageModule {}
