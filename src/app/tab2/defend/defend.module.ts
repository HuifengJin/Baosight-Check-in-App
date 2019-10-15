import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Tab2Page } from './../../tab2/tab2.page';

import { IonicModule } from '@ionic/angular';

import { DefendPage } from './defend.page';

const routes: Routes = [
  {
    path: '',
    component: DefendPage
  },
  {
    path: 'tab2',
    component: Tab2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DefendPage,Tab2Page]
})
export class DefendPageModule {}
