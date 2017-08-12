/**
 * Created by 8th Wonder Software LLC on 5/26/17.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, Keyboard, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { UtilService } from '../../providers/util-service';
import { AuthService } from '../../providers/auth-service';
import { TutorialPage } from "../tutorial/tutorial";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {

  private signupForm: FormGroup;

  /**
   * Constructor
   *
   * @param navCtrl
   * @param navParams
   * @param keyboard
   * @param view
   * @param formBuilder
   * @param afAuth
   * @param utilService
   * @param authService
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public keyboard: Keyboard, private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private utilService: UtilService, public authService: AuthService) {

  }

  /**
   * Initialize Component Properties When Angular is Ready
   */
  ngOnInit() {
    // AngularFire2 Subscribe to Firebase User
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.utilService.debug('signup page user authenticated');

        this.navCtrl.setRoot(TutorialPage);
      }
    });

    // Build Signup Form
    this.signupForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Call AuthService to Create New Users
   */
  signup() {
    let fname = this.signupForm.value.firstName;
    let lname = this.signupForm.value.lastName;
    let email = this.signupForm.value.email;
    let pass = this.signupForm.value.password;

    this.authService.signupEmail(email, pass, fname, lname);
  }

}
