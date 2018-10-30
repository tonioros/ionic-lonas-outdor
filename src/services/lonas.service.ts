import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../base/constants";
import {FileTransfer, FileUploadOptions} from "@ionic-native/file-transfer";

@Injectable()
export class LonasService {
  constructor(private httpClient: HttpClient,
              private transfer: FileTransfer) {
  }

  getLonas(): Observable<{ res: any[], access: boolean }> {
    return this.httpClient.get<{ res: any[], access: boolean }>(`${Constants.API_URL_BASE}lonas`)
  }

  getLonasByAgencia(agencia_id: number): Observable<{ res: any, access: boolean }> {
    return this.httpClient.get<{ res: any, access: boolean }>(`${Constants.API_URL_BASE}lonas?agencia=${agencia_id}`)
  }

  getLona(id: number): Observable<{ res: any, access: boolean }> {
    return this.httpClient.get<{ res: any, access: boolean }>(`${Constants.API_URL_BASE}lonas/${id}`)
  }

  postReporteLona(lona_id: number, observaciones: string, lat: number, lon: number,
                  agenda_id: number, reporte_detalle: { estado_id: number }[]): Observable<any> {
    const data = {
      lona_id,
      observaciones,
      lat,
      lon,
      agenda_id,
      reporte_detalle,
    };
    return this.httpClient.post(`${Constants.API_URL_BASE}reporte-lonas`, data);
  }

  uploadFile(imagePath: string, fileName: string, reporte_id: number) {
    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileName,
      httpMethod: 'POST',
    };

    console.log(options, imagePath);
    console.log(reporte_id);

    return this.transfer.create().upload(imagePath,
      `${Constants.API_URL_BASE}reporte-lonas/${reporte_id}/upload`, options);
  }

  getReporteLonas(): Observable<{
    res: {
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
    }[], access: boolean
  }> {
    return this.httpClient.get<{
      res: {
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
      }[], access: boolean
    }>(`${Constants.API_URL_BASE}/reporte-lonas`);
  }

}
