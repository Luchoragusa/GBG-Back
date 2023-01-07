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

  // Devuelve el base 64 de una imagen
  extraerBase64(image : File) {
    return new Observable((observer) => {
      this.readFile(image, observer);
    });
  }

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
