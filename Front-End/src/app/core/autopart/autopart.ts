import { CarBrand } from '../car-brand/car-brand';
import { PartType } from '../part-type/part-type';
import { PartBrand } from '../part-brand/part-brand';
export interface Autopart {
    id: string;
    partType : PartType;
    partBrand: PartBrand;
    partModel: string;
    carBrand: CarBrand;
    serialNumber:string;
    stock: number;
    drawer: string;
    description: string;
    image: string | File;
}

export interface AutopartCreate {
    idPartType : number;
    idPartBrand: number;
    partModel: string;
    idCarBrand: number;
    serialNumber:string;
    stock: number;
    drawer: string;
    description: string;
    image: File;
}