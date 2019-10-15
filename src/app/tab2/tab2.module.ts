 import { UpdatePage } from './update/update.page';
import { DefendPage } from './defend/defend.page';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { CalendarModule } from 'ionic2-calendar2';

export const routes: Routes = [
  {
    path: '',
    component: Tab2Page
  },
  {
    path: 'defend',
    component: DefendPage
  },
  {
    path: 'update',
    component: UpdatePage
  }
];
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CalendarModule
  ],
  declarations: [Tab2Page, DefendPage, UpdatePage]
})
export class Tab2PageModule {}
