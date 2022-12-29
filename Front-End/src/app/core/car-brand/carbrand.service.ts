import { Injectable } from '@angular/core';
import { CarBrand } from './Car-brand';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  constructor() { }


  // Devuelve todas los tipos de repuestos
  getCarBrands(): CarBrand[] {
    return [
      { id: '1', name: 'Audi' },
      { id: '2', name: 'BMW' },
      { id: '3', name: 'Chevrolet' },
      { id: '4', name: 'Chrysler' },
      { id: '5', name: 'Citroen' },
      { id: '6', name: 'Dodge' },
      { id: '7', name: 'Fiat' },
      { id: '8', name: 'Ford' },
      { id: '9', name: 'Honda' },
      { id: '10', name: 'Hyundai' },
      { id: '11', name: 'Jaguar' },
      { id: '12', name: 'Jeep' },
      { id: '13', name: 'Kia' },
      { id: '14', name: 'Lada' },
      { id: '15', name: 'Land Rover' },
      { id: '16', name: 'Mazda' },
      { id: '17', name: 'Mercedes Benz' },
      { id: '18', name: 'Mini' },
      { id: '19', name: 'Mitsubishi' },
      { id: '20', name: 'Nissan' },
      { id: '21', name: 'Opel' },
      { id: '22', name: 'Peugeot' },
      { id: '23', name: 'Porsche' },
      { id: '24', name: 'Renault' },
      { id: '25', name: 'Seat' },
      { id: '26', name: 'Skoda' },
      { id: '27', name: 'Ssangyong' },
      { id: '28', name: 'Subaru' },
      { id: '29', name: 'Suzuki' },
      { id: '30', name: 'Toyota' },
      { id: '31', name: 'Volkswagen' },
      { id: '32', name: 'Volvo' },
    ];
  }
}
