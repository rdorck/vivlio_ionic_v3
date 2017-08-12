import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';

import { CampusBooksProvider } from '../../providers/campus-books/campus-books';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root = SearchPage;
  public tab2Root = CartPage;

  /**
   * Constructor
   *
   * @param navCtrl
   */
  constructor(public navCtrl: NavController, private campusBooks: CampusBooksProvider) {

  }
}
