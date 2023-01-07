import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CarBrand } from './Car-brand';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  url = environment.apiUrl + '/carbrands';

  constructor(private _http: HttpClient) {}

  // Devuelve todas los tipos de repuestos
  getCarBrands(): Observable<CarBrand[]> {
    return this._http.get<CarBrand[]>(this.url);
  }

  createCarBrand(carBrand: any): Observable<CarBrand> {
    return this._http.post<CarBrand>(this.url, carBrand);
  }
  
}
