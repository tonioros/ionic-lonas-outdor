import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MarkerOptions, LatLng, Environment
} from '@ionic-native/google-maps';
import {VayaService} from "../../services/vaya.service";
import {BaseComponent} from "../../base/base-component.component";
import {ReporteLonasPage} from "../reporte-lonas/reporte-lonas";

@Component({
  selector: 'page-home',
  templateUrl: 'vallas-maps.html'
})
export class HomePage extends BaseComponent {
  latLon = {
    lat: 15.7834711, // Coordenadas de
    lon: -90.2307587, // Ciudad de Guatemala
  };

  map: GoogleMap;
  latLong: LatLng = new LatLng(this.latLon.lat, this.latLon.lon);


  constructor(private geolocation: Geolocation,
              private navCtrl: NavController,
              private vayaService: VayaService,
              private alertCtrl: AlertController) {
    super(alertCtrl);
  }

// Load map only after view is initialized
  ngAfterViewInit() {
    Environment.setEnv({
      /*
       * API key for Google Maps JavaScript API v3 for `https:` (on server)
       */
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyC0qXJl1kq_rvOM_Zz8_32JRW1GceCP-sU",
      /*
       * API key for Google Maps JavaScript API v3 for `http:` (local development)
       */
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyC0qXJl1kq_rvOM_Zz8_32JRW1GceCP-sU"
    });

    this.loadMap();
    this.loadVayas();
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latLon.lat = resp.coords.latitude;
      this.latLon.lon = resp.coords.longitude;

      this.latLong = new LatLng(this.latLon.lat, this.latLon.lon);
      if (!!this.map) {
        this.map.moveCamera({target: this.latLong, zoom: 18, tilt: 30});
      }
    })
      .catch((error) => {
        let alert = this.alertCtrl.create({
          title: 'Error en Ubicacion',
          subTitle: 'No hemos podido obtener tu ubicacion :( | Error: ' + error.message,
          buttons: ['Ok!']
        });
        alert.present();
        this.map.moveCamera({target: this.latLong, zoom: 18, tilt: 30});
      });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    this.map = GoogleMaps.create(element);

    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
      }
    );

    this.latLong = new LatLng(43.0741904, -89.3809802);
    this.map.moveCamera({
      target: this.latLong,
      zoom: 18,
      tilt: 30
    });


    this.getCurrentPosition();
  }

  loadVayas(): void {
    this.vayaService.getVayas().subscribe(resp => {
      for (let data of resp.res) {
        this.generateMarker(data);
      }
    },
        err => this.showAlertOk("Error on response HTTP", JSON.stringify(err)));
  }

  generateMarker(datos) {
    const latLong: LatLng = new LatLng(+datos.lat, +datos.lon);
    let markerOptions: MarkerOptions = {
      position: latLong,
      title: datos.nombre + " Dir: " + datos.direccion,
    };

    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK)
          .subscribe((value) => {
            this.navCtrl.push(ReporteLonasPage, {datos});
          }, (error) => {
            this.showAlertOk("Error", marker.getTitle() + " " + error);
          })
      });
  }

}
