import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssessqueryContentPage } from './assessquery-content.page';

const routes: Routes = [
  {
    path: '',
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
  declarations: [] // AssessqueryContentPage
})
export class AssessqueryContentPageModule {}
