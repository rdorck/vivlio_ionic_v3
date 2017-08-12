import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import campusBooks from '../../pages/environment/environment';

import { ModalController } from 'ionic-angular';
import { UtilService } from '../../providers/util-service';

@Injectable()
export class CampusBooksProvider {

  searchQuery: string = '';
  books: string[];
  modal: any;

  /**
   * Constructor
   * @param http
   * @param modalCtrl
   * @param utilService
   */
  constructor(public http: Http, private modalCtrl: ModalController, private utilService: UtilService) {
    console.log('CampusBooks Provider Active');

    this.initializeBooks();
  }

  /**
   * Initialize Test Sample of Books
   */
  initializeBooks() {
    this.books = [
      'Captain Underpants',
      'Harry Potter',
      'How Not to be Wrong',
      'IT',
      'Jungle Book',
      'PEAK',
      'The Art of War',
      'The Shining'
    ];


  }

  /**
   * Initial Loading of Test Books
   * @return {string[]}
   */
  loadBooks() : string[] {
    if (this.books != null) {
      return this.books;
    } else {
      console.log('No Books');
    }
  }

  /**
   * Load New Search Results
   * @param ev
   */
  getBooks(ev: any) {
    // Reset books back to all of them
    this.initializeBooks();

    // Set val to value of searchbar
    let val = ev.target.value;

    // Empty? Don't filter
    if (val && val.trim() != '') {
      this.books = this.books.filter((book) => {
        return (book.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
   * Get Selected Book Data
   */
  getBook(book: any) {
    console.log('Get Book: ' + book);
    this.presentModal('BookPage', { book: book });
  }

  /**
   * Clear Local Variables
   */
  clear() {
    this.searchQuery = '';
    this.books = [];
    this.initializeBooks();
  }

  /**
   * Present modalPage as a Modal
   * @param modalPage
   */
  presentModal(modalPage: any, data: any) {
    this.utilService.debug('modal', modalPage);
    if (modalPage == '') {
      console.log('Whoops! We forgot the modal')
    } else {
      this.modal = this.modalCtrl.create(modalPage, data);
      this.modal.present();
    }
  }

  /**
   * Dismiss (Destroy) Present Modal
   * @param modalPage
   */
  dismissModal(modalPage: any) {
    if (!modalPage) {
      console.log('modalPage is required to dismiss modal.');
    } else {

    }
  }

}
