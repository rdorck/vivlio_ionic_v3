import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UtilService } from '../providers/util-service';

/**
 * Injectable Authentication Service Handling Firebase Auth
 */
@Injectable()
export class AuthService {

  /**
   * Constructor
   *
   * @param http
   * @param utilService
   * @param afAuth
   */
  constructor(private http: Http, public utilService: UtilService, private afAuth: AngularFireAuth) {
    console.log('AuthService Provider Active');

    // Observer Subscribe to Firebase User
    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        console.log('**** AuthService - User Not Authenticated');
        return;
      } else {
        this.utilService.debug('authservice user authenticated');
      }
    });
  }

  /**
   * Create User With Email & Password
   *
   * @param email
   * @param password
   * @param firstName
   * @param lastName
   */
  signupEmail(email: string, password: string, firstName?: string, lastName?: string) {
    let util = this.utilService;

    // Using AngularFire2 to create Firebase User w/ Password
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        util.debug('new user', user);
        // let header = {
        //   'Content-Type': 'application/json',
        //   'Authorization': user.accessToken
        // };
        //
        // var data = {
        //   'email': user.email,
        //   'firstName': firstName,
        //   'lastName': lastName
        // };
        //
        // var response = this.http.post('http://docker.dev/api/user/create', data, header);
        // this.utilService.debug('vivlio response', response);
      })
      .catch(function(error) {
        util.consoleError(error);
      });
  }

  /**
   * Login With Email & Password
   *
   * @param provider
   */
  login(provider: any) {
    let util = this.utilService;

    var email = provider['email'];
    var password = provider['password'];

    if (email && password) {
      // Use Email & Password to SignIn to Firebase
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          if (user) {
            util.debug('user logged in');
          }
        })
        .catch(function (error) {
          util.consoleError(error);
          util.popToast(error.message);
        });
    } else {
      util.popToast('Email & Password are required.');
    }
  }

  /**
   * Delete Firebase User Profile
   */
  deleteProfile() {
    let util = this.utilService;

    this.afAuth.auth.currentUser.delete().then(() => {
      util.popToast('Account Successfully Deleted');
    }).catch(function (error) {
      util.consoleError(error);
    });
  }
}
