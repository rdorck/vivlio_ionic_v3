import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from "../pages/settings/settings";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{ title: string, icon: string, component: any }>;
  user: Observable<firebase.User>;

  /**
   * Constructor for Ionic Application
   *
   * @param platform
   * @param statusBar
   * @param splashScreen
   * @param afAuth
   */
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    this.initializeApp();

    // Initialize Menu Items
    this.pages = [
      { title: 'Profile', icon: 'person', component: ProfilePage },
      { title: 'About', icon:'www/assets/8th-Wonder-Icon.png', component: AboutPage },
      { title: 'Settings', icon: 'settings', component: SettingsPage },
      { title: 'Logout', icon: 'exit', component: 'logout' }
    ];

    // Observer Listening to AuthState Changes on User
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        // User is authenticated
        console.log('**** [GLOBAL] - User is authenticated.');
      } else {
        // User is no longer authenticated
        console.log('**** [GLOBAL] - User is no longer authenticated.');

        // Navigate to LoginPage
        this.nav.setRoot(LoginPage);
      }
    });
  }

  /**
   * Initialize Ionic Application
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  /**
   * Load Page From Sidemenu
   * @param item
   */
  itemTapped(item) {
    var page = item.component;
    console.log('app.components itemTapped() ' + page.name);

    // Since There is no LogoutPage, just call logout function
    if (page === 'logout') {
      this.logout();
    } else {
      // Push page to nav
      this.nav.push(page, {
        item: item
      });
    }
  }

  /**
   * Sign Out Current User, Alerting All Subscribers Starting Globally
   */
  logout() {
    console.log('**** Goodbye! - USER LOGGED OUT ****');
    this.afAuth.auth.signOut();
  }
}
