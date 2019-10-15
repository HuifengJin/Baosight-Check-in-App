import { WaixieLoginComponent } from './../../../model/waixie-login/waixie-login.component';
import { AlertRadioModule } from './../../../model/alert-radio/alert-radio.module';
import { ManDrcPage } from './../man-drc/man-drc.page';
import { ManManagerPage } from './../man-manager/man-manager.page';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagerPage } from './manager.page';


const routes: Routes = [
  {
    path: '',
    component: ManagerPage
  }
  , {
    path: 'man-drc',
    component: ManDrcPage
  }
  , {
    path: 'man-manager',
    component: ManManagerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertRadioModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagerPage, ManDrcPage, ManManagerPage, WaixieLoginComponent],
  entryComponents: [ WaixieLoginComponent]
})
export class ManagerPageModule {}
