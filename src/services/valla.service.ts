import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Constants} from "../base/constants";

@Injectable()
export class VallaService {

  constructor(private httpService: HttpClient) {
  }

  getVallas(): Observable<{res: any[], access: boolean}> {
    return this.httpService.get<{res: any[], access: boolean}>(Constants.API_URL_BASE + 'agencias');
  }

  getValla(id: number): Observable<{res: any, access: boolean}> {
    return this.httpService.get<{res: any[], access: boolean}>(Constants.API_URL_BASE + `agencias/${id}`);
  }
}
