import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PartType } from './part-type';

@Injectable({
  providedIn: 'root'
})
export class PartTypeService {

  url = environment.apiUrl + '/parttypes';

  constructor(private _http: HttpClient) {}


  // Devuelve todos los tipos de repuestos
  getPartTypes(): Observable<PartType[]> {
    return this._http.get<PartType[]>(this.url);
  }

  createPartType(partType: any): Observable<PartType> {
    return this._http.post<PartType>(this.url, partType);
  }

  updatePartType(partType: any): Observable<PartType> {
    return this._http.put<PartType>(`${this.url}/${partType.id}`, partType);
  }

}
