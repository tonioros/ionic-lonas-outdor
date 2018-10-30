import {Component} from '@angular/core';
import {LonasService} from "../../services/lonas.service";
import {BaseComponent} from "../../base/base-component.component";

@Component({
  selector: 'page-contact',
  templateUrl: 'lista-reportes-lonas.html'
})
export class ContactPage extends BaseComponent {

  reporteLista: {
    lona_id: number,
    observaciones: string,
    file_path: string,
    lat: number,
    lon: number,
    agenda_id: number,
    descripcion: string,
    tamanio: string,
    nombre: string,
    direccion: string,
  }[] = [];

  constructor(public lonasService: LonasService) {
    super();
  }
  ionViewDidLoad() {
    this.loadReportes();
  }


  loadReportes() {
    this.lonasService.getReporteLonas()
      .subscribe(res => {
        this.reporteLista = res.res;
      }, err => {
        this.showAlertOk('Error al obtener datos', 'Datos no cargados').present()
      });
  }


}
