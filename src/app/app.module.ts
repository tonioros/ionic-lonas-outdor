import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {ContactPage} from '../pages/lista-reportes-lonas/lista-reportes-lonas';
import {HomePage} from '../pages/valla-maps/vallas-maps';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GoogleMaps} from "@ionic-native/google-maps";
import {Geolocation} from '@ionic-native/geolocation';
import {VallaService} from "../services/valla.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LonasService} from "../services/lonas.service";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera} from "@ionic-native/camera";
import {File} from '@ionic-native/file';
import {FileTransfer} from "@ionic-native/file-transfer";
import {UsuarioService} from "../services/usuario.service";
import {ReporteLonasPageModule} from "../pages/reporte-lonas/reporte-lonas.module";
import {LoginPageModule} from "../pages/login/login.module";

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ReporteLonasPageModule,
    LoginPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    LonasService,
    GoogleMaps,
    VallaService,
    UsuarioService,
    ImagePicker,
    Camera,
    HttpClient,
    File,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ],
})
export class AppModule {
}
