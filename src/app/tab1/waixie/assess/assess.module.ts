import { AssessContentPage } from './../assess-content/assess-content.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssessPage } from './assess.page';
const routes: Routes = [
  {
    path: '',
    component: AssessPage
  },
  {
    path: 'assessContent',
    component: AssessContentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssessPage, AssessContentPage]
})
export class AssessPageModule {}
