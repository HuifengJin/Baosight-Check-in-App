import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public form:any;
  // const form = new FormGroup({
  //    first: new FormControl('Nancy', Validators.minLength(2)),
  //  last: new FormControl('Drew'),
  //  });
   
  // console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
  // console.log(form.status);  // 'VALID'
  public firstName;
  public lastName;
  constructor(public alertCtrl: AlertController) {
    // this.form = new FormGroup({
    //   firstName: new FormControl("", Validators.required),
    //   lastName: new FormControl("", Validators.required)
    // });
  }
  // async presentAlert() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Alert',
  //     subHeader: 'Subtitle',
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });
  //   if (this.form.status === 'VALID') {
  //     console.log('111');
  //     await alert.present();
  //   }
    
  // }

 

   processForm(event) {
    event.preventDefault();
    this.alertCtrl.create({
      header: 'Account Created',
      message: `Created account for: ${this.firstName} ${this.lastName}`,
      buttons: [{
        text: 'OK'
      }]
    }).then(alert => alert.present());
  }

   handleFirstNameValue(event) {
    this.firstName = event.target.value;
  }

   handleLastNameValue(event) {
    this.lastName = event.target.value;
  }



  // processForm() {
  //   console.log('111');
  //   async presentAlert() {
  //     const alert = await this.alertController.create({
  //       header: 'Alert',
  //       subHeader: 'Subtitle',
  //       message: 'This is an alert message.',
  //       buttons: ['OK']
  //     });
  
  //     await alert.present();
  //   }
  //   // let alert = this.alertCtrl.create({
  //   //   header: "Account Created",
  //   //   message: "Created Account for: " + this.form.value.firstName + " " + this.form.value.lastName,
  //   //   buttons: [{
  //   //     text: 'Ok',
  //   //   }]
  //   // });

  //   // if (this.form.status === 'VALID') {
  //   //   // alert.present()
      
  //   // }
  // }
}
