/**
 * Created by 8th Wonder Software LLC on 5/27/17.
 */
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Keyboard } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { UtilService } from '../../providers/util-service';
import { AuthService } from '../../providers/auth-service';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;

  /**
   * Constructor
   *
   * @param navCtrl
   * @param navParams
   * @param keyboard
   * @param formBuilder
   * @param afAuth
   * @param utilService
   * @param authService
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public keyboard: Keyboard, private formBuilder: FormBuilder, private afAuth: AngularFireAuth, public utilService: UtilService, private authService: AuthService) {

  }

  /**
   * Initialize Component Properties When Angular is Ready
   */
  ngOnInit() {
    // AngularFire2 Subscribe to Firebase User
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.utilService.debug('LoginPage User is Authenticated');

        // User Already Authenticated, Navigate to TabsPage (aka Home)
        this.navCtrl.setRoot(TabsPage);
      }
    });

    // Build Login Form
    this.loginForm = this.formBuilder.group({
      email: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });

  }

  /**
   * Login via AuthService
   *
   * @param source: string
   */
  login(source: string) {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    let provider = [{ source, email, password }];

    this.authService.login(provider[0]);
  }

  // Push SignupPage on Navigation Stack
  pushSignup() {
    this.navCtrl.push(SignupPage);
  }

  /**
   * Send Reset Password Email
   */
  resetPassword() {

  }
}
