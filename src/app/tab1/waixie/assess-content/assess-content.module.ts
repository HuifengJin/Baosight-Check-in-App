import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssessContentPage } from './assess-content.page';
import { AssessPage } from '../assess/assess.page';

const routes: Routes = [
  {
    path: '',
    component: AssessContentPage
  },
  {
    path: 'assess',
    component: AssessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssessContentPage, AssessPage]
})
export class AssessContentPageModule {}
