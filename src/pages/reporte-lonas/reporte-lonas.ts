import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReporteLonasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reporte-lonas',
  templateUrl: 'reporte-lonas.html',
})
export class ReporteLonasPage {

  vallaSeleccionada: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReporteLonasPage');
    this.vallaSeleccionada = this.navParams.get("daatos")
    if (!!this.vallaSeleccionada) {

    }
  }
}
