/**
 * Created by 8th Wonder Software LLC on 5/29/17.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Keyboard } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UtilService } from '../../providers/util-service';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {

  /**
   * Constructor
   *
   * @param navCtrl
   * @param navParams
   * @param formBuilder
   * @param afAuth
   * @param utilService
   * @param authService
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private utilService: UtilService, private authService: AuthService) {

    // AngularFire2 Subscribe to Firebase User
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.utilService.debug('SettingsPage User is Authenticated', user.email);
      }
    });

  }

  /**
   * Initialize Component Properties When Ready
   */
  ngOnInit() {

  }

  /**
   * Delete User Account in Firebase
   */
  deleteAccount() {
    this.authService.deleteProfile();
  }
}
