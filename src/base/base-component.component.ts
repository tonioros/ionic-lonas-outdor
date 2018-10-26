import {AlertController} from "ionic-angular";

export abstract class BaseComponent {
  constructor(private _alertCtrl: AlertController) {
  }

  showAlertOk(title: string, message: string) {
    let alert = this._alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok!']
    });
    alert.present();
  }
}
