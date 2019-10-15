import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AffirmCheckPage } from './../affirm-check/affirm-check.page';

import { IonicModule } from '@ionic/angular';

import { AffirmDetailPage } from './affirm-detail.page';

import { CalendarModule } from 'ion2-calendar';

const routes: Routes = [
  {
    path: '',
    component: AffirmDetailPage
  },
  {
    path: 'affirm-check',
    component: AffirmCheckPage
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
  declarations: [AffirmDetailPage]
})
export class AffirmDetailPageModule {}
