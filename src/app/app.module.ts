/**
 * Created By: 8th Wonder Software LLC
 */

// Imports Are Formatted To Quickly Note Dependencies

// Angular Libraries
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Ionic Libraries
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Third Party Libraries
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Providers
import { UtilService } from '../providers/util-service';
import { AuthService } from '../providers/auth-service';
import { CampusBooksProvider } from '../providers/campus-books/campus-books';

// Components
import { MyApp } from './app.component';
import { firebaseConfig } from '../pages/environment/environment';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { CartPage } from '../pages/cart/cart';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    SettingsPage,
    TutorialPage,
    AboutPage,
    ContactPage,
    ProfilePage,
    SearchPage,
    CartPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      activator: 'ripple'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    SettingsPage,
    TutorialPage,
    AboutPage,
    ContactPage,
    ProfilePage,
    SearchPage,
    CartPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilService,
    AuthService,
    CampusBooksProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
