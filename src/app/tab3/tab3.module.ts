import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab3Page } from './tab3.page';
import { AlertController } from '@ionic/angular';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
// import {
//   FormGroup,
//   FormControl,
//   Validators,FormsModule
// } from '@angular/forms';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // FormGroup,
    // FormControl,
    // Validators,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
