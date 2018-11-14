import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { searchVatApi } from './vat.constants';

@Injectable({
  providedIn: 'root'
})
export class VatService {

  constructor(
    private _http: HttpClient
  ) { }

  // Constant default headers to be sent with GET/POST operations
  private get defaultHeaders(): { [name: string]: string | string[]; } {
    return {
      'Accept': 'application/json'
    }
  };

  searchVat(vatNumber: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders(this.defaultHeaders);
    return this._http.get<any[] | object>(searchVatApi, { params: { vatNumber }, headers })
  }
}