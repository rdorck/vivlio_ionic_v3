import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { UtilService } from '../../providers/util-service';
import { CampusBooksProvider } from '../../providers/campus-books/campus-books';

/**
 * Generated class for the BookPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage implements OnInit {

  book: any;

  /**
   * Constructor
   *
   * @param navParams
   * @param view
   * @param utilService
   * @param campusBooks
   */
  constructor(private navParams: NavParams, private view: ViewController, private utilService: UtilService, private campusBooks: CampusBooksProvider) {
  }

  /**
   * Ionic View Load Complete
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  /**
   * Angular Components Loaded & Ready
   */
  ngOnInit() {
    console.log('BookPage Active');
    if (!this.navParams.get('book')) {
      this.utilService.consoleError('No Book Passed to Modal');
    } else {
      this.book = this.navParams.get('book');
      this.utilService.debug('load book', this.book);
    }
  }

  /**
   * Dismiss Current Modal
   */
  dismissModal() {
    this.view.dismiss();
  }

}
