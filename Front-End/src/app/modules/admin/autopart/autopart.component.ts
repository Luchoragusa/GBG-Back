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
import { PartBrand } from 'app/core/part-brand/part-brand';
import { PartBrandService } from 'app/core/part-brand/parbrand.service';
import { CarBrand } from 'app/core/car-brand/Car-brand';

@Component({
  selector: 'app-autopart',
  templateUrl: './autopart.component.html',
  styleUrls: ['./autopart.component.scss']
})
export class AutopartComponent  implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'partType', 'partBrand', "partModel", "carBrand", "serialNumber", "stock", "drawer", "description", "image", 'actions'];
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

  autoParts : Autopart[];
  
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
  serialNumberFilter = new FormControl('');

  filterValues = {
    partType: '',
    partBrand: '',
    partModel: '',
    carBrand: '',
    serialNumber: ''
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
        serialNumber: [''],
        description : [''],
        drawer      : [''],
        image       : [''],
    });

    // Get all
    this.partTypes = this._partypeService.getPartTypes();
    this.carBrands = this._carBrandService.getCarBrands();
    this.partBrands = this._partBrandService.getPartBrands();

    this._autopartService.getAutoparts().subscribe(
      (data: Autopart[]) => {
        this.autoParts = data;
        console.log("🚀 ~ file: autopart.component.ts:100 ~ AutopartComponent ~ ngOnInit ~ data", data)
        
        this.dataSource = new MatTableDataSource(this.autoParts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

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
    this.serialNumberFilter.valueChanges
      .subscribe(
        serialNumber => {
          this.filterValues.serialNumber = serialNumber.toLowerCase();
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

  viewDescription(description : string) {
    this.dialog.open(ShowdialogComponent, {
      data: {
        type: 'description',
        data: description
      }
    });
  }

  // Metodo que devuelve bool si el campo es null

  getStatus(value : string) {
    if(value != null){
      return true;
    }else{
      return false;
    }
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
      serialNumber: this.autoPartForm.value.serialNumber,
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
      serialNumber: autoPart.serialNumber,
    });

    this.imageBase64 =        autoPart.image;
    this.selectedPartType =   autoPart.partType.name;
    this.selectedCarBrand =   autoPart.carBrand.name;
    this.selectedPartBrand =  autoPart.partBrand.name;
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
}
