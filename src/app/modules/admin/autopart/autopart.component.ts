import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowdialogComponent } from './showdialog/showdialog.component';

export interface PartData {
  id: string;
  partBrand: string;
  modelPart: string;
  carBrand: string;
  drawer: number;
  description: string;
  stock: number;
}

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

  marcaRepuesto: Food[] = [
    {value: 'steak-0', viewValue: 'Bosch'},
    {value: 'pizza-1', viewValue: 'Magneti Marelli'},
    {value: 'tacos-2', viewValue: 'Delphi'},
    {value: 'tacos-3', viewValue: 'Valeo'},

  ];
  selectedmarcaRepuesto = this.marcaRepuesto[2].value;

  marcaAuto: Food[] = [
    {value: 'steak-0', viewValue: 'Volvo'},
    {value: 'pizza-1', viewValue: 'BMW'},
    {value: 'tacos-2', viewValue: 'Mercedes'},
    {value: 'tacos-3', viewValue: 'Audi'},
  ];
  selectedmarcaAuto = this.marcaAuto[2].value;


  displayedColumns: string[] = ['id', 'name', "model", "carName", "stock", "drawer", "description", "image", 'actions'];
  dataSource: MatTableDataSource<PartData>;
  drawerMode: 'side' | 'over';
  autoPartForm !: FormGroup;
  dismissed: boolean = true;
  drawerOpened: boolean;
  configForm: FormGroup;
  sideTittle: string = 'Agregar repuesto';
  isEditAutoPart: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
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
        name        : [''],
        model       : [''],
        carName     : [''],
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
    this.dialog.open(ShowdialogComponent, {
      data: {
        type: 'image',
        data: image
      }
    });
  }

  // Metodo q muestra la descripcion en el dialog

  viewDescription(autopart : PartData) {
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
    console.log("En toggleDrawer " + this.isEditAutoPart);
  }

  // Metodo q guarda el formulario
  saveAutoPart() {
    this.toggleDrawer(false);
    this.dismissed = false;
  }

  // Metodo para eidtar un repuesto
  edit(){
    this.sideTittle = "Editar repuesto";
    this.toggleDrawer(true);
  }

  mode(){
    return this.isEditAutoPart;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): PartData {

  return {
    id: id.toString(),
    partBrand: partnames[Math.round(Math.random() * (partnames.length - 1))],
    modelPart: "Me796",
    carBrand: carnames[Math.round(Math.random() * (carnames.length - 1))],
    drawer: Math.round(Math.random() * 100),
    description: "Peugeot 206/207 Motor 1.4 8v o 1.6 16v",
    stock: Math.round(Math.random() * 100),
  };
}