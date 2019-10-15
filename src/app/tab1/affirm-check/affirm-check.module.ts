import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AffirmDetailPage } from './../affirm-detail/affirm-detail.page';

import { IonicModule } from '@ionic/angular';

import { AffirmCheckPage } from './affirm-check.page';
import { CalendarModule } from 'ion2-calendar';


const routes: Routes = [
  {
    path: '',
    component: AffirmCheckPage
  },
  {
    path: 'affirm-detail',
    component: AffirmDetailPage
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
  declarations: [AffirmCheckPage, AffirmDetailPage]
})
export class AffirmCheckPageModule {}
