import {Component} from '@angular/core';
import {Checkbox, IonicPage, NavParams} from 'ionic-angular';
import {LonasService} from "../../services/lonas.service";
import {BaseComponent} from "../../base/base-component.component";
import {Camera, CameraOptions, CameraPopoverOptions} from "@ionic-native/camera";
import {Geolocation} from "@ionic-native/geolocation";
import {File} from '@ionic-native/file';

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
export class ReporteLonasPage extends BaseComponent {

  ready: boolean = false;
  caracteristicas: any[] = [];
  defectos: any[] = [];
  lona: { id: number, descripcion: string, tamanio: string };
  imageUri: string = "";
  observaciones: string = '';
  latLon = {
    lat: 15.7834711, // Coordenadas de
    lon: -90.2307587, // Ciudad de Guatemala
  };
  reporte_detalle: { estado_id: number }[] = [];

  vallaSeleccionada: any;

  constructor(public navParams: NavParams,
              private geolocation: Geolocation,
              private file: File,
              private camera: Camera,
              private lonasService: LonasService) {
    super();
  }

  ionViewDidLoad() {
    this.vallaSeleccionada = this.navParams.get("datos");
    if (!!this.vallaSeleccionada) {
      this.loadVallaDetails();
    }
  }

  getImageFromCamera() {
    let popoverOptions: CameraPopoverOptions = {
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
    };

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 1280,
      targetHeight: 1280,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      cameraDirection: this.camera.Direction.BACK,
      popoverOptions: popoverOptions
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        this.imageUri = imageData;
        this.toastCtrl.create({
          message: 'Imagen guarda!',
          duration: 400,
        }).present();
      })
      .catch((err) => {
        this.showAlertOk('Oh, parece que tenemos problemas',
          `Error: ${JSON.stringify(err)}`)
          .present()
          .then(() => {
            this.toastCtrl.create({
              duration: 1000,
              message: 'No hemos podido guardar la fotografia',
            })
          });
      });
  }

  getImageFromGallery() {
    let popoverOptions: CameraPopoverOptions = {
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
    };

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 1280,
      targetHeight: 1280,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      cameraDirection: this.camera.Direction.BACK,
      popoverOptions: popoverOptions
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        this.imageUri = imageData;
        this.toastCtrl.create({
          message: 'Imagen guarda!',
          duration: 400,
        }).present();
      })
      .catch((err) => {
        this.showAlertOk('Oh, parece que tenemos problemas',
          `Error: ${JSON.stringify(err)}`)
          .present()
          .then(() => {
            this.toastCtrl.create({
              duration: 1000,
              message: 'No hemos podido guardar la fotografia',
            })
          });
      });
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latLon.lat = resp.coords.latitude;
      this.latLon.lon = resp.coords.longitude;
    });
  }

  clickCheckEstado(id: number, check: Checkbox) {
    const index = this.reporte_detalle.findIndex(detalle => detalle.estado_id == id);
    if (index > 0)
      this.reporte_detalle.splice(index, 1);

    if (index < 0)
      this.reporte_detalle.push({estado_id: id});
  }

  private loadVallaDetails(): void {
    this.lonasService.getLonasByAgencia(this.vallaSeleccionada.id)
      .subscribe(res => {
        this.caracteristicas = res.res.detalle_lona.filter(element => element.tipo_estado == 2);
        this.defectos = res.res.detalle_lona.filter(element => element.tipo_estado == 1);
        this.lona = res.res;
        this.ready = true;
      }, error => {
        this.ready = false;
        this.showAlertOk('Oh, parece que tenemos problemas',
          `Error: ${JSON.stringify(error)}`)
          .present();
      })
  }

  getFileName(path: string): string {
    let name = "";
    for (let i = path.length; i > 1; i--) {
      if (path.substring(i - 1, i) === '/' || path.substring(i - 1, i) === '\\') {
        name = path.substring(i, path.length);
        break;
      }
    }
    return name;
  }

  saveReporte(): void {
    const loadingDialog = this.loadingCtrl.create({
      content: 'Cargando',
      dismissOnPageChange: true,
    });
    loadingDialog.present();
    this.lonasService.postReporteLona(this.lona.id, this.observaciones, this.latLon.lat,
      this.latLon.lon, this.vallaSeleccionada.id, this.reporte_detalle)
      .subscribe(res => {
        const id = res.res.id;
        this.lonasService.uploadFile(this.imageUri, this.getFileName(this.imageUri), id)
          .then(() => {
            loadingDialog.dismissAll();
            this.navCtrl.canGoBack();
            this.navCtrl.popToRoot();
            this.toastCtrl.create({
              message: 'Guardado!',
              duration: 1000,
              closeButtonText: 'Cerrar',
              showCloseButton: true,
            })
              .present();
          })
          .catch(err => {
            console.error(err);
            loadingDialog.dismissAll();
            this.showAlertOk('Error de red',
              'Code: ' + err.http_status + " Err: " + err.body).present();
          });
      }, err => {
        loadingDialog.dismissAll();
        this.showAlertOk('Error al guardar reporte',
          `Tenemos problemas :s - ${JSON.stringify(err)}`);
      });
  }
}
