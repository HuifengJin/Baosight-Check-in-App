import { AlertRadioComponent } from './alert-radio.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlertRadioComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
   exports: [ AlertRadioComponent]
})
export class AlertRadioModule { }
