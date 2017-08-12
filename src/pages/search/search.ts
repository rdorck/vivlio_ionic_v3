/**
 * Created by 8th Wonder Software LLC on 5/26/17.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { UtilService } from '../../providers/util-service';
import { BookPage } from '../book/book';
import { CampusBooksProvider } from '../../providers/campus-books/campus-books';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit {

  public searchQuery: string = '';
  public books: string[];
  results: any[];

  /**
   * Search Page Constructor
   *
   * @param navCtrl
   * @param navParams
   * @param loadingCtrl
   * @param modalCtrl
   * @param campusBooks
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private campusBooks: CampusBooksProvider){

  }

  /**
   * Angular Components Loaded & Ready
   */
  ngOnInit() {
    this.books = this.campusBooks.loadBooks();
    this.results = this.books;
  }

  /**
   * Loads Books
   * @param ev
   */
  getBooks(ev: any) {
    // Set val to value of searchbar
    let val = ev.target.value;

    // Filter results array or reload books
    if (val && val.trim() != '') {
      this.results = this.results.filter((book) => {
        return (book.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.results = this.books;
    }

  }

  /**
   * Present Book Modal
   *
   * @param book
   */
  itemSelected(book: string) {
    this.campusBooks.getBook(book);
  }

  /**
   * Cancel Search Bar's Active Searching
   *
   * @param event
   */
  onCancel(event) {
    this.searchQuery = '';
    console.log('Searchbar Cancel');
  }

  /**
   * Scan BarCode For Book Data
   *
   * @param event
   */
  scanBarcode(event) {
    console.log('Get ready to point your camera at the barcode!');
  }

  /**
   * Refresh Search Results By Pulling List Down
   * @param event
   */
  refresh(event) {
    this.books = [];
    this.results = [];

    this.books = this.campusBooks.loadBooks();
    this.results = this.books;

    event.complete();
  }
}
