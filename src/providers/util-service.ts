import { Injectable, OnInit } from '@angular/core';
import { ToastController, LoadingController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Dependency Injector UtilService
 */
@Injectable()
export class UtilService implements OnInit {

  protected loader: any;

  /**
   * Constructor
   *
   * @param toastCtrl
   * @param loadingCtrl
   */
  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    console.log('UtilService Provider Active');
  }

  /**
   * Initialize Component Properties When Angular is Ready
   */
  ngOnInit() {
    // Create Loader
    this.loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Saving...'
    });
  }

  /**
   * Prints Formatted Debugging Statement
   *
   * @param title
   * @param data
   * @param type
   */
  debug(title: string, data?: any, type?: boolean) {
    let debugTitle = '\n\n **** ' + title.toUpperCase() + ' ****\n\n';
    console.log(debugTitle);

    if (type) {
      console.log('[DataType] - ' + typeof data + '\n');
    }

    if (data) {
      console.log(JSON.stringify(data));
      console.log('\n**** END ' + title.toUpperCase() + ' ****\n\n');
    }
  }

  /**
   * Prints Formatted Error Statement
   *
   * @param error
   * @param details
   */
  consoleError(error: any, details?: any) {
    console.log('\n\n**** ERROR ****\n\n');

    error.code ? console.log('[CODE] - ' + error.code) : console.log('[CODE] - 000');
    error.message ? console.log('[MESSAGE] - ' + error.message) : console.log('[ERROR] - ' + error);

    if (details) {
      console.log('[DETAILS] - ' + details);
    }
    console.log('\n*********************\n\n');
  }

  /**
   * Pop Toastr, Butter With Message. Option to use close button
   * @param message
   * @param closeButton
   * @param closeButtonText?
   * @param type?
   */
  popToast(message: string, closeButton: boolean = false, closeButtonText?: string, type?: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      showCloseButton: closeButton,
      closeButtonText: closeButtonText,
      cssClass: '' // TODO: Select CSS depending on type
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /**
   * Displays Loader
   */
  presentLoader() {
    this.loader.present();
  }

  /**
   * Dismisses Loader
   */
  dismissLoader() {
    this.loader.dismiss();
  }

  /**
   * Present modalPage as a Modal
   *
   * @param modalPage
   */
  presentModal(modalPage: any, data: any) {
    if (!modalPage) {
      this.popToast('Whoops! We forgot the modal')
    } else {
      let modal = this.modalCtrl.create(modalPage, data);
      modal.present();
    }
  }

  /**
   * Dismiss (Destroy) Present Modal
   *
   * @param modalPage
   */
  dismissModal(modalPage: any) {
    if (!modalPage) {
      console.log('modalPage is required to dismiss modal.');
    } else {
      modalPage.dismiss();
    }
  }
}
