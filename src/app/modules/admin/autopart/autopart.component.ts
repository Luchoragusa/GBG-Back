import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowdialogComponent } from './showdialog/showdialog.component';
import { Autopart } from 'app/core/autopart/autopart';
import { AutopartService } from 'app/core/autopart/autopart.service';
import { PartypeService } from 'app/core/part-type/partype.service';
import { PartType } from 'app/core/part-type/part-type';
import { CarBrandService } from 'app/core/car-brand/carbrand.service';
import { CarBrand } from 'app/core/car-brand/car-brand';
import { PartBrand } from 'app/core/part-brand/part-brand';
import { PartBrandService } from 'app/core/part-brand/parbrand.service';

/** Constants used to fill up our data base. */
const carnames: string[] = [
  'BMW',
  'Mercedes',
  'Audi',
  'Volkswagen',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Maserati',
  'Alfa Romeo',
  'Ford',
  'Chevrolet',
  'Dodge',
  'Jeep',
];

const partnames: string[] = [
  'Bosh',
  'Delphi',
  'Denso',
  'Magnetti Marelli',
];

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-autopart',
  templateUrl: './autopart.component.html',
  styleUrls: ['./autopart.component.scss']
})
export class AutopartComponent  implements AfterViewInit, OnInit {
  
  displayedColumns: string[] = ['id', 'partType', 'partBrand', "partModel", "carBrand", "stock", "drawer", "description", "image", 'actions'];
  dataSource: MatTableDataSource<Autopart>;
  autoPartForm !: FormGroup;
  dismissed: boolean = true;
  drawerOpened: boolean;
  configForm: FormGroup;
  sideTittle: string = 'Agregar repuesto';
  isEditAutoPart: boolean = false;
  imageBase64 : string = null;
  viewAlert:boolean = false;
  
  partTypes : PartType[];
  selectedPartType : PartType;
  
  carBrands : CarBrand[];
  selectedCarBrand : CarBrand;

  partBrands : PartBrand[];
  selectedPartBrand: PartBrand;

  dialogMessage: string = 'Esta seguro que desea eliminarla ? <span class="font-medium">Al eliminarla se borraran todos los repuestos vinculados con esta marca.</span>';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _autopartService: AutopartService,
    private _partypeService: PartypeService,
    private _carBrandService: CarBrandService,
    private _partBrandService: PartBrandService
  ) {
  }
  ngOnInit(): void {
    // Create the task form
    this.autoPartForm = this._formBuilder.group({
        id          : [''],
        partType    : [''],
        partBrand   : [''],
        partModel   : [''],
        carBrand    : [''],
        description : [''],
        drawer      : [''],
        image       : ['']
    });

    // Get all
    this.partTypes = this._partypeService.getPartTypes();
    this.carBrands = this._carBrandService.getCarBrands();
    this.partBrands = this._partBrandService.getPartBrands();
    
    // Form edit o create
    this.selectedPartType = this.partTypes[1];
    this.selectedCarBrand = this.carBrands[1];
    this.selectedPartBrand = this.partBrands[1];

    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Metodo q muestra la imagen en el dialog

  viewImage(image : string) {
    console.log(image);
    this.dialog.open(ShowdialogComponent, {
      data: {
        type: 'image',
        data: image
      }
    });
  }

  // Metodo q muestra la descripcion en el dialog

  viewDescription(autopart : Autopart) {
    const description = autopart.description;
    this.dialog.open(ShowdialogComponent, {
      data: {
        type: 'description',
        data: description
      }
    });
  }

  // Metodo q muestra/oculta el drawer
  toggleDrawer(mode : boolean) {
    if(mode){
      this.isEditAutoPart = true;
    }else{
      this.isEditAutoPart = false;
    }
    this.drawerOpened = !this.drawerOpened;
    this.autoPartForm.reset();
  }

  // Metodo q guarda el formulario
  saveAutoPart() {
    this.toggleDrawer(false);
    this.dismissed = false;
    this.autoPartForm.controls['partType'].setValue(this.selectedPartType); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['partBrand'].setValue(this.selectedPartBrand); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['carBrand'].setValue(this.selectedCarBrand); // <-- Set Value formControl for select option value (marcaAuto)
    this.autoPartForm.controls['image'].setValue(this.imageBase64); // <-- Set Value formControl for select option value (marcaAuto)
    console.log(this.autoPartForm.value);
  }

  // Metodo para eidtar un repuesto
  edit(){
    this.sideTittle = "Editar repuesto";
    this.toggleDrawer(true);
  }

  mode(){
    return this.isEditAutoPart;
  }

  // Metodo para subir una imagen

  onChange(event: any) {
    const file = event.target.files[0];
    this._autopartService.extraerBase64(file).subscribe((res: any) => {
      this.imageBase64 = res;
    });
  }

  // Metodo para obtener el base 64 de la imagen
  getBase64() {
    return this.imageBase64;
  }
  delete() {
    this.viewAlert = true; // Esto muestra la alerta, hacer que lo haga despues de que se registra en la db

    // Depues tengo q hacer q se ponga en false, sino no abre mas el dialog
    // this.viewAlert = false;
  }

  getViewAlert(){
    return this.viewAlert;
  }



  createNewUser(id: number): Autopart {
    return {
      id: id.toString(),
      partType: this.partTypes[Math.round(Math.random() * (this.partTypes.length - 1))].name,
      partBrand: this.partBrands[Math.round(Math.random() * (this.partBrands.length - 1))].name,
      partModel: "Me796",
      carBrand: this.carBrands[Math.round(Math.random() * (this.carBrands.length - 1))].name,
      drawer: Math.round(Math.random() * 100),
      description: "Peugeot 206/207 Motor 1.4 8v o 1.6 16v",
      stock: Math.round(Math.random() * 100),
      image: "https://www.mercadolibre.com.ar/jms/mla/lgz/msl/slideshow/MLA-911000-MLA41010000001_092020-O.webp"
    };
  }
}
