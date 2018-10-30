import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Constants} from "../base/constants";

@Injectable()
export class UsuarioService {

  constructor(private httpService: HttpClient) {
  }

  login(usuario: string, pass: string): Observable<{res: any[], access: boolean}> {
    const field = {
      usuario, pass
    };
    return this.httpService.post<{res: any, access: boolean}>(Constants.API_URL_BASE + 'usuarios/login', field);
  }
}
