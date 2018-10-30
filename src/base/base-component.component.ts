import {Alert, AlertController, AlertOptions, LoadingController, NavController, ToastController} from "ionic-angular";
import {appInstance, moduleInjector} from "../app/app.component";

export abstract class BaseComponent {
  alertCtrl: AlertController;
  navCtrl: NavController;
  loadingCtrl: LoadingController;
  toastCtrl: ToastController;

  constructor() {
    this.alertCtrl = moduleInjector.get(AlertController);
    this.navCtrl = appInstance.getRootNav();
    this.loadingCtrl = moduleInjector.get(LoadingController);
    this.toastCtrl = moduleInjector.get(ToastController);
  }

  showAlertOk(title: string, message: string, options?: AlertOptions): Alert {
    options = {
      title: title,
      subTitle: message,
      buttons: ['Ok!']
    };
    return this.alertCtrl.create(options);
  }
}
