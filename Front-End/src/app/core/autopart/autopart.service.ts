import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subscriber } from 'rxjs';
import { Autopart } from './autopart';

@Injectable({
  providedIn: 'root'
})
export class AutopartService {

  url = environment.apiUrl + '/autoparts';

  constructor(private _http: HttpClient) {}

  getAutoparts(): Observable<Autopart[]> {
    return this._http.get<Autopart[]>(this.url);
  }
  
  createAutoPart(autopart: any): Observable<Autopart> {
    return this._http.post<Autopart>(`${this.url}/file`, autopart);
  }

  addStock (autopart: Autopart): Observable<Autopart> {
    return this._http.put<Autopart>(`${this.url}/add/${autopart.id}`, autopart);
  }

  substracStock (autopart: Autopart): Observable<Autopart> {
    return this._http.put<Autopart>(`${this.url}/substract/${autopart.id}`, autopart);
  }

  // Creo q no lo uso a este metodo
  readFile(image: File, observer: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(image);
    filereader.onload = () => {
      observer.next(filereader.result);
      observer.complete();
    }
    filereader.onerror = (error) => {
      observer.error(error);
      observer.complete();
    }
  }

}
