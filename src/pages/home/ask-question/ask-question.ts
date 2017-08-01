import { Component } from '@angular/core'
import { ModalController, ViewController, NavController } from 'ionic-angular'

import { PreviewQuestionPage } from './preview-question/preview-question'
import { AskedQuestionPage } from './asked-question/asked-question'
import { StreamData } from '../../../providers/questions-stream'

// Imports for Google Translate
import { TranslateService } from '../../../providers/translate';
import { UtilityHelpers } from '../../../providers/utility-helpers';

@Component({
    selector: "page-ask-question",
    templateUrl: "ask-question.html"
})

export class AskQuestionPage {
    constructor (
      private modalCtrl: ModalController,
      private viewCtrl: ViewController,
      private navCtrl: NavController,
      private service: StreamData
    ) {
    }

    hideTip = false
    selectedTopic = "Algebra"
    topics = [
        'Algebra',
        'Calculus',
        'Geometry',
        'Trigonometry',
        'Combinatorics',
        'Topography',
        'Statistics'
    ]
    questionBody: string = ''
    questionDetails: string = ''
    tags = []
    currentUser = this.service.getUser()

    onClickDismiss () {
        this.hideTip = true
    }

    onClickPreview_Ask (isPreview) {
        let question = this.getQuestion()
        this.postQuestion (isPreview, question)
    }

    getQuestion () {
        let question: any = {
            subject: 'Math',
            topic: this.selectedTopic,
            tags: this.tags,
            questionBody: this.questionBody,
            questionDetails: this.questionDetails,
            isClosed: false,
            closedOn: '',
            createdOn: Date.now(),
            userName: this.currentUser.displayName,
            userPhotoURL: this.currentUser.photoURL,
            userId: this.currentUser.uid,
            userClosed: this.currentUser.uid+false
        }
        return question
    }

    postQuestion (isPreview, question) {
        if (isPreview === false) { // save in db
            this.service.postQuestion(question)
                .then((item:any)=> {
                    this.showSubmittedQuestion(question, item.key)
                })
        } else { // pass question to preview
            this.showPreview(question)
        }
    }

    showSubmittedQuestion (question, key) {
        let askModal = this.modalCtrl.create(AskedQuestionPage, { question: question, questionKey: key });
        askModal.present();
    }

    showPreview (question) {
        let previewModal = this.modalCtrl.create(PreviewQuestionPage, question);
        previewModal.present();
    }

    onClickClose () {
        this.viewCtrl.dismiss()
    }
}
