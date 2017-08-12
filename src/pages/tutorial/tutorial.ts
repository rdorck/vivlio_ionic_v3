/**
 * Created by 8th Wonder Software LLC on 5/27/17.
 */
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  @ViewChild(Slides) slides: Slides;

  /**
   * Constructor
   *
   * @param navCtrl
   */
  constructor(public navCtrl: NavController) {

  }

  /**
   * Transition to Next Slide
   */
  goToSlide() {
    this.slides.slideTo(1, 500);
  }

  /**
   * Fires After Slide Successfully Changed
   */
  slideDidChange() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current tutorial page index ', currentIndex);
  }

  /**
   * Set Navigation Controller to TabsPage
   */
  goHome() {
    this.navCtrl.setRoot(TabsPage);
  }

  skip() {
    this.navCtrl.setRoot(TabsPage);
  }
}
