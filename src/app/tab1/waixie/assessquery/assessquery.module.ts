import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssessqueryPage } from './assessquery.page';
import { AssessqueryContentPage } from '../assessquery-content/assessquery-content.page';

const routes: Routes = [
  {
    path: '',
    component: AssessqueryPage
  },
  {
    path: 'assessquery-content',
    component: AssessqueryContentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssessqueryPage, AssessqueryContentPage]
})
export class AssessqueryPageModule {}
