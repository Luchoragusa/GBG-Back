import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autopart } from './autopart';

@Injectable({
  providedIn: 'root'
})
export class AutopartService {

  constructor() { }

  createTask(type: string): Observable<Autopart>
  {
      return new Observable<Autopart>();
  }
}
