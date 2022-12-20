import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowdialogComponent } from './showdialog/showdialog.component';
import { Autopart } from 'app/core/autopart/autopart';
import { AutopartService } from 'app/core/autopart/autopart.service';

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

  partBrand: Food[] = [
    {value: 'steak-0', viewValue: 'Bosch'},
    {value: 'pizza-1', viewValue: 'Magneti Marelli'},
    {value: 'tacos-2', viewValue: 'Delphi'},
    {value: 'tacos-3', viewValue: 'Valeo'},

  ];
  selectedPartBrand = this.partBrand[1].value;

  carBrand: Food[] = [
    {value: 'steak-0', viewValue: 'Volvo'},
    {value: 'pizza-1', viewValue: 'BMW'},
    {value: 'tacos-2', viewValue: 'Mercedes'},
    {value: 'tacos-3', viewValue: 'Audi'},
  ];
  selectedCarBrand = this.carBrand[1].value;

  partType: Food[] = [
    {value: 'steak-0', viewValue: 'Motor'},
    {value: 'pizza-1', viewValue: 'Frenos'},
    {value: 'tacos-2', viewValue: 'Suspension'},
    {value: 'tacos-3', viewValue: 'Electrico'},
  ];
  selectedPartType = this.partType[1].value;


  displayedColumns: string[] = ['id', 'partType', 'partBrand', "partModel", "carBrand", "stock", "drawer", "description", "image", 'actions'];
  dataSource: MatTableDataSource<Autopart>;
  drawerMode: 'side' | 'over';
  autoPartForm !: FormGroup;
  dismissed: boolean = true;
  drawerOpened: boolean;
  configForm: FormGroup;
  sideTittle: string = 'Agregar repuesto';
  isEditAutoPart: boolean = false;
  imageBase64 : string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _autopartService: AutopartService
  ) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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
      // Parametro del dialog
      this.configForm = this._formBuilder.group({
        title      : 'Eliminar',
        message    : 'Esta seguro que desea eliminarla ? <span class="font-medium">Al eliminarla se borraran todos los repuestos vinculados con esta marca.</span>',
        icon       : this._formBuilder.group({
            show : true,
            name : 'heroicons_outline:exclamation',
            color: 'warn'
        }),
        actions    : this._formBuilder.group({
            confirm: this._formBuilder.group({
                show : true,
                label: 'Eliminar',
                color: 'warn'
            }),
            cancel : this._formBuilder.group({
                show : true,
                label: 'Cancelar'
            })
        }),
        dismissible: true
    });
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
    // this.toggleDrawer(false);
    // this.dismissed = false;
    this.autoPartForm.controls['partType'].setValue(this.selectedPartType); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['partBrand'].setValue(this.selectedPartBrand); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['carBrand'].setValue(this.selectedCarBrand); // <-- Set Value formControl for select option value (marcaAuto)
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
      console.log(this.imageBase64);
      this.autoPartForm.get('image')?.setValue(this.imageBase64); // <-- Set Value formControl
    });
  }

  // Metodo para obtener el base 64 de la imagen
  getBase64() {
    return this.imageBase64;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): Autopart {

  return {
    id: id.toString(),
    partType: "Motor",
    partBrand: partnames[Math.round(Math.random() * (partnames.length - 1))],
    partModel: "Me796",
    carBrand: carnames[Math.round(Math.random() * (carnames.length - 1))],
    drawer: Math.round(Math.random() * 100),
    description: "Peugeot 206/207 Motor 1.4 8v o 1.6 16v",
    stock: Math.round(Math.random() * 100),
    image: "https://www.mercadolibre.com.ar/jms/mla/lgz/msl/slideshow/MLA-911000-MLA41010000001_092020-O.webp"
  };
}