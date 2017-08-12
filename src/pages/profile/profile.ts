/**
 * Created by 8th Wonder Software LLC on 5/26/17.
 */
import {Component, OnInit} from '@angular/core';
import { NavController, NavParams, LoadingController, Keyboard } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UtilService } from '../../providers/util-service';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

  // Variables
  private loader: any;
  private profileForm: FormGroup;
  private user: any;

  displayName: string;

  /**
   * Constructor
   *
   * @param navCtrl
   * @param navParams
   * @param loadingCtrl
   * @param keyboard
   * @param formBuilder
   * @param afAuth
   * @param utilService
   * @param authService
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public keyboard: Keyboard, private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private utilService: UtilService, private authService: AuthService) {

  }

  /**
   * Initialize Component Properties When Ready
   */
  ngOnInit() {
    // AngularFire2 Subscribe to Firebase User
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log('ProfilePage User Authenticated');
        this.user = user;
        this.displayName = user.displayName;
      } else {
        this.user = null;
        this.displayName = null;
      }
    });

    // Create Loader
    this.loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Saving...'
    });

    // Initialize build of profileForm
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  /**
   * Update User Profile
   */
  saveProfile() {
    let profileValues = this.profileForm.value;
    let fname = profileValues.firstName;
    let lname = profileValues.lastName;
    let email = profileValues.email;

    let displayName = fname + ' ' + lname;
    let user = this.user;
    let util = this.utilService;

    // Call to Update Profile
    user.updateProfile({
      displayName: displayName
    }).then(function () {
      console.log('Profile Successfully Updated.');
      util.popToast('Profile successfully updated')
    }).catch(function (error) {
      util.consoleError(error);
    });

    // Update Email If Changed
    if (email !== null) {
      if (email !== user.email) {
        user.updateEmail(email)
          .then(() => {
            console.log('Email Updated to ' + email);
          })
          .catch(function (error) {
            util.consoleError(error);
          });
      }
    }

    // Pop Controller
    this.navCtrl.pop();
  }

  updateAvatar() {

  }

  /**
   * Displays crescent loader
   */
  presentLoader() {
    this.loader.present();
  }

  /**
   * Dismisses crescent loader
   */
  dismissLoader() {
    this.loader.dismiss();
  }
}
