import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PartBrand } from './part-brand';

@Injectable({
  providedIn: 'root'
})
export class PartBrandService {

  url = environment.apiUrl + '/partbrands';

  constructor(private _http: HttpClient) {}

  // Devuelve todas los tipos de repuestos
  getPartBrands(): Observable<PartBrand[]> {
    return this._http.get<PartBrand[]>(this.url);
  }

  createPartBrand(partBrand: any): Observable<PartBrand> {
    return this._http.post<PartBrand>(this.url, partBrand);
  }
  
}

