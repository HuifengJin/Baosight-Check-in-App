import { MessContentPage } from './../mess-content/mess-content.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessqueryPage } from './messquery.page';
const routes: Routes = [
  {
    path: '',
    component: MessqueryPage
  },
  {
    path: 'mess-content',
    component: MessContentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessqueryPage, MessContentPage]
})
export class MessqueryPageModule {}
