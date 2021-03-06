import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-teaching-subjects',
  templateUrl: 'teaching-subjects.html',
})
export class TeachingSubjectsPage {

  loggedInUser: FirebaseListObservable<any[]>;
  subjects = [
    'Algebra',
    'Calculus',
    'Geometry',
    'Trigonometry',
    'Combinatorics',
    'Topography',
    'Statistics'
  ];
  u = this.navParams.get('u');

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.toggleSubjects = this.toggleSubjects.bind(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeachingSubjectsPage');
    let user = this.afAuth.auth.currentUser;
    if ( user != null ) {
      //Get logged in user from af database by matching user id
      this.loggedInUser = this.af.list('/users',  {
        query: {
          orderByChild: 'user_id',
          equalTo: user.uid
        }
      });
      console.log('user id is: ', user.uid, user.uid == "Uniaj6st9eNPlrt4HuUwDxGETeb2");
      console.log('loggedInUser set to: ', this.loggedInUser);
    }
  }

  toggleSubjects(subject) {
    console.log('ion item clicked!')
    // console.log('u in toggleSubjects', u);
    // console.log('u.learningSubjects in toggleSubjects', u.learningSubjects);

    this.u.teachingSubjects[subject] = !this.u.teachingSubjects[subject];
    // update teachingSubjects[subject] in firebase
    this.loggedInUser.update(this.u.$key, { teachingSubjects: this.u.teachingSubjects });

  }

}
