import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManManagerPage } from './man-manager.page';
import { ManagerPage } from '../manager/manager.page';

const routes: Routes = [
  {
    path: '',
    component: ManManagerPage
  },
  {
    path: 'manager',
    component: ManagerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManManagerPage, ManagerPage]
})
export class ManManagerPageModule {}
