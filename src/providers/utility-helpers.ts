import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform, ToastController } from 'ionic-angular';


@Injectable()
export class UtilityHelpers {
  _question = {
    key: 'unknown',
    image: '',
    closed: false,
    category: 'algebra',
    open_date: Date.now(),
    question: 'Where does the constant pi come from?',
    likes: 0,
    dislikes: 0,
    user_id: 'unknown',
    user: 'Unknown'
  };
    constructor(
      public http: Http,
      public toastCtrl: ToastController
    ) {


    }

    popToast(s) {
      let toast = this.toastCtrl.create({
        message: s,
        duration: 2500
      });
      toast.present();
    }

    setQuestion(q) {
      this._question = q;
    }

    getQuestion() {
      return this._question;
    }

    //takes in an int = ms since epoch
    //returns a string of human readable time format
    humanReadableTime (t) {
      let tCurrent = Date.now();
      let msDifference = tCurrent - t;

      //very recently posted
      if (msDifference < 30000) {
        return 'just now';
      }

      //posted around 30 seconds ago
      if (msDifference < 60000) {
        return '30 seconds ago';
      }
      //posted at least 1 minute ago (main algorithm)
      //mS in a minute= 60000
      const MS_IN_MINUTE = 60000;
      //mS in an hour= 3600000
      const MS_IN_HOUR = 3600000;
      //mS in a day= 86400000
      const MS_IN_DAY = 86400000;
      //mS in a week= 604800000
      const MS_IN_WEEK = 604800000;
      //mS in a year= 31536000000
      const MS_IN_YEAR = 31536000000;

      let time = '';

      if (msDifference > MS_IN_YEAR) {
        let years = Math.floor(msDifference / MS_IN_YEAR);
        msDifference = msDifference - (years * MS_IN_YEAR);

        //Handle single or plural cases
        let ending = years == 1 ? 'year' : 'years';
        time = time + `${years} ${ending} `;
      }

      if (msDifference > MS_IN_WEEK) {
        let weeks = Math.floor(msDifference / MS_IN_WEEK);
        msDifference = msDifference - (weeks * MS_IN_WEEK);

        //Handle single or plural cases
        let ending = weeks == 1 ? 'week' : 'weeks';
        time = time + `${weeks} ${ending} `;
      }

      if (msDifference > MS_IN_DAY) {
        let days = Math.floor(msDifference / MS_IN_DAY);
        msDifference = msDifference - (days * MS_IN_DAY);

        //Handle single or plural cases
        let ending = days == 1 ? 'day' : 'days';
        time = time + `${days} ${ending} `;
      }

      if (msDifference > MS_IN_HOUR) {
        let hours = Math.floor(msDifference / MS_IN_HOUR);
        msDifference = msDifference - (hours * MS_IN_HOUR);

        //Handle single or plural cases
        let ending = hours == 1 ? 'hour' : 'hours';
        time = time + `${hours} ${ending} `;
      }

      if (msDifference > MS_IN_MINUTE) {
        let minutes = Math.floor(msDifference / MS_IN_MINUTE);
        msDifference = msDifference - (minutes * MS_IN_MINUTE);

        //Handle single or plural cases
        let ending = minutes == 1 ? 'minute' : 'minutes';
        time = time + `${minutes} ${ending} `;
      }

      time = time + 'ago'

      return time;


    }

}
