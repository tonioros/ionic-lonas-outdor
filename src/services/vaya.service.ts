import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class VayaService {

  constructor(private httpService: HttpClient) {
  }

  private API_URL_BASE: string = 'https://lonas-outdor.herokuapp.com/api/v1/';

  getVayas(): Observable<{res: any[], access: boolean}> {
    return this.httpService.get<{res: any[], access: boolean}>(this.API_URL_BASE + 'agencias');
  }
}
