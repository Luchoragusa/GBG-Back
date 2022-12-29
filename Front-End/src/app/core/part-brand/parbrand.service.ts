import { Injectable } from '@angular/core';
import { PartBrand } from './part-brand';

@Injectable({
  providedIn: 'root'
})
export class PartBrandService {

  constructor() { }


  // Devuelve todas los tipos de repuestos
  getPartBrands(): PartBrand[] {
    return [
      { id: '1', name: 'Bosch' },
      { id: '2', name: 'Denso' },
      { id: '3', name: 'Delphi' },
      { id: '4', name: 'Nippon Denso' },
      { id: '5', name: 'Magneti Marelli' },
      { id: '6', name: 'Valeo' },
      { id: '7', name: 'Brembo' },
      { id: '8', name: 'Akebono' },
      { id: '9', name: 'TRW' },
      { id: '10', name: 'Bosal' },
    ];
  }
}
