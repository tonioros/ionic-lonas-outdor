import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {BaseComponent} from "../../base/base-component.component";
import {UsuarioService} from "../../services/usuario.service";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseComponent {

  usuario: string = "";
  pass: string = "";

  constructor(private loginService: UsuarioService) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    const loading = this.loadingCtrl.create({
      content: 'Ingresando...'
    });
    loading.present();
    this.loginService.login(this.usuario, this.pass)
      .subscribe(res => {
        if (res.access) {
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.showAlertOk("Error en Login", "Usuario o contraseña incorrectos");
        }
        loading.dismissAll();
      }, err => {
        loading.dismissAll();
        this.showAlertOk("Error en Login", JSON.stringify(err));
      })
  }

}
