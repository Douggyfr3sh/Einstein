import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

  constructor(
    public auth: Auth,
    public user: User,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
    console.log('this.user', this.user);
    console.log('this.user.details.email', this.user.details.email);
    console.log('this.user.details.username', this.user.details.username);
    console.log('this.user.details.name', this.user.details.name);
    // console.log('this.details.password', this.details.password);

  }
  // ngAfterViewInit() {
  //   this.getUsername();
  // }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  // changeUsername() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Change Username',
  //     buttons: [
  //       'Cancel'
  //     ]
  //   });
  //   alert.addInput({
  //     name: 'username',
  //     value: this.username,
  //     placeholder: 'username'
  //   });
  //   alert.addButton({
  //     text: 'Ok',
  //     handler: (data: any) => {
  //       this.userData.setUsername(data.username);
  //       this.getUsername();
  //     }
  //   });
  //
  //   alert.present();
  // }

  // getUsername() {
  //   this.userData.getUsername().then((username) => {
  //     this.username = username;
  //   });
  // }

  changePassword() {
    console.log('Clicked to change password');
  }

  // logout() {
  //   this.userData.logout();
  //   this.navCtrl.setRoot('LoginPage');
  // }

  support() {
    this.navCtrl.push('SupportPage');
  }
}
