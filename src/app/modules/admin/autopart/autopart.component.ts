import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  editObject: Autopart = null;
  
  partTypes : PartType[];
  selectedPartType : string = null;
  
  carBrands : CarBrand[];
  selectedCarBrand : string = null;

  partBrands : PartBrand[];
  selectedPartBrand: string = null;

  dialogMessage: string = 'Esta seguro que desea eliminarla ? <span class="font-medium">Al eliminarla se borraran todos los repuestos vinculados con esta marca.</span>';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Filtros

  partTypeFilter = new FormControl('');
  partBrandFilter = new FormControl('');
  partModelFilter = new FormControl('');
  carBrandFilter = new FormControl('');

  filterValues = {
    partType: '',
    partBrand: '',
    partModel: '',
    carBrand: ''
  };

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

    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);

    // Set the filter predicates for the table

    this.partTypeFilter.valueChanges
      .subscribe(
        partType => {
          this.filterValues.partType = partType.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
          console.log(this.dataSource.filter);
        }
      )
    this.partBrandFilter.valueChanges
      .subscribe(
        partBrand => {
          this.filterValues.partBrand = partBrand.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.partModelFilter.valueChanges
      .subscribe(
        partModel => {
          this.filterValues.partModel = partModel.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.carBrandFilter.valueChanges
      .subscribe(
        carBrand => {
          this.filterValues.carBrand = carBrand.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.partType.toLowerCase().indexOf(searchTerms.partType) !== -1
        && data.partBrand.toString().toLowerCase().indexOf(searchTerms.partBrand) !== -1
        && data.partModel.toLowerCase().indexOf(searchTerms.partModel) !== -1
        && data.carBrand.toLowerCase().indexOf(searchTerms.carBrand) !== -1;
    }
    return filterFunction;
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

      // Reset form values
      this.imageBase64 = null;
      this.selectedCarBrand = null;
      this.selectedPartBrand = null;
      this.selectedPartType = null;
    }
    this.drawerOpened = !this.drawerOpened;
    this.autoPartForm.reset();
  }

  // Metodo q guarda el formulario
  saveAutoPart() {

    this.autoPartForm.controls['partType'].setValue(this.selectedPartType); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['partBrand'].setValue(this.selectedPartBrand); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['carBrand'].setValue(this.selectedCarBrand); // <-- Set Value formControl for select option value (marcaAuto)

    const autoPartToSave : Autopart = {
      id          : this.autoPartForm.value.id,
      partType    : this.autoPartForm.value.partType,
      partBrand   : this.autoPartForm.value.partBrand,
      partModel   : this.autoPartForm.value.partModel,
      carBrand    : this.autoPartForm.value.carBrand,
      description : this.autoPartForm.value.description,
      drawer      : this.autoPartForm.value.drawer,
      image       : this.imageBase64,
      stock       : this.autoPartForm.value.stock
    }

    this.toggleDrawer(false);
    this.dismissed = false;
  }

  // Metodo para eidtar un repuesto
  edit(autoPart : Autopart){
    this.sideTittle = "Editar repuesto";
    this.toggleDrawer(true);

    this.editObject = autoPart;

    this.autoPartForm.patchValue({
      id          : autoPart.id,
      partModel   : autoPart.partModel,
      drawer      : autoPart.drawer,
      description : autoPart.description,
    });

    this.imageBase64 = autoPart.image;
    this.selectedPartType = autoPart.partType;
    this.selectedCarBrand = autoPart.carBrand;
    this.selectedPartBrand = autoPart.partBrand;
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
      image: "data:image/webp;base64,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"
    };
  }
}
