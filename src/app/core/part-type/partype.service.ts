import { Injectable } from '@angular/core';
import { PartType } from './part-type';

@Injectable({
  providedIn: 'root'
})
export class PartypeService {

  constructor() { }


  // Devuelve todos los tipos de repuestos
  getPartTypes(): PartType[] {
    return [
      { id: '1', name: 'Ecu' },
      { id: '2', name: 'Freno' },
      { id: '3', name: 'Stereo' },
      { id: '4', name: 'Inyector' },
      { id: '5', name: 'Tablero' },
      { id: '6', name: 'ABS' },
      { id: '7', name: 'A/C' },
    ];
  }
}
