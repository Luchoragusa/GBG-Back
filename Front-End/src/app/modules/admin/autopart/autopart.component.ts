import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowdialogComponent } from './showdialog/showdialog.component';
import { Autopart, AutopartCreate } from 'app/core/autopart/autopart';
import { AutopartService } from 'app/core/autopart/autopart.service';
import { PartTypeService } from 'app/core/part-type/parttype.service';
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
export class AutopartComponent  implements OnInit {

  displayedColumns: string[] = ['partType', 'partBrand', "carBrand", "partModel", "serialNumber", "stock", "drawer", "description", "image", 'actions'];
  dataSource: MatTableDataSource<Autopart>;
  autoPartForm !: FormGroup;
  dismissed: boolean = true;
  drawerOpened: boolean;
  configForm: FormGroup;
  sideTittle: string = 'Agregar repuesto';
  isEditAutoPart: boolean = false;
  viewAlert:boolean = false;
  editObject: Autopart = null;
  image: File = null;

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
    private _parttypeService: PartTypeService,
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
        stock       : ['']
    });

    // Get all autoparts
    this._autopartService.getAutoparts().subscribe(
      (data: Autopart[]) => {
        this.autoParts = data;
        this.dataSource = new MatTableDataSource(this.autoParts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      }
    );

    // Set the filter predicates for the table

    this.partTypeFilter.valueChanges
      .subscribe(
        partType => {
          this.filterValues.partType = partType.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
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

    // others getAll's

    this._parttypeService.getPartTypes().subscribe(
      (data: PartType[]) => {
        this.partTypes = data;
        this.partTypes.unshift({id: "0", name: ""});
      }
    );

    this._carBrandService.getCarBrands().subscribe(
      (data: CarBrand[]) => {
        this.carBrands = data;
        this.carBrands.unshift({id: "0", name: ""});
      }
    );
    
    this._partBrandService.getPartBrands().subscribe(
      (data: PartBrand[]) => {
        this.partBrands = data;
        this.partBrands.unshift({id: "0", name: ""});
      }
    );
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log("🚀 ~ file: autopart.component.ts:165 ~ AutopartComponent ~ createFilter ~ searchTerms", searchTerms)
      
      var dataParse = {
        partType: data.partType.name || "-",
        partBrand: data.partBrand.name || "-",
        partModel: data.partModel || "-",
        carBrand: data.carBrand.name || "-",
        serialNumber: data.serialNumber || "-"
      }

      return dataParse.partType.toLowerCase().indexOf(searchTerms.partType) !== -1
        && dataParse.partBrand.toLowerCase().indexOf(searchTerms.partBrand) !== -1
        && dataParse.partModel.toLowerCase().indexOf(searchTerms.partModel) !== -1
        && dataParse.carBrand.toLowerCase().indexOf(searchTerms.carBrand) !== -1
        && dataParse.serialNumber.toLowerCase().indexOf(searchTerms.serialNumber) !== -1;
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
      this.image = null;
      this.selectedCarBrand = null;
      this.selectedPartBrand = null;
      this.selectedPartType = null;
    }
    this.drawerOpened = !this.drawerOpened;
    this.autoPartForm.reset();
  }

  // Metodo q guarda el formulario
  saveAutoPart() {
    var formData = new FormData()

    this.autoPartForm.controls['partType'].setValue(this.selectedPartType); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['partBrand'].setValue(this.selectedPartBrand); // <-- Set Value formControl for select option value (marcaRepuesto)
    this.autoPartForm.controls['carBrand'].setValue(this.selectedCarBrand); // <-- Set Value formControl for select option value (marcaAuto)

    formData.append('idPartType', this.autoPartForm.value.partType);
    formData.append('idPartBrand', this.autoPartForm.value.partBrand);
    formData.append('partModel', this.autoPartForm.value.partModel);
    formData.append('idCarBrand', this.autoPartForm.value.carBrand);
    formData.append('serialNumber', this.autoPartForm.value.serialNumber);
    formData.append('description', this.autoPartForm.value.description);
    formData.append('drawer', this.autoPartForm.value.drawer);
    formData.append('stock', this.autoPartForm.value.stock);
    formData.append('image', this.image);
    
    this._autopartService.createAutoPart(formData).subscribe(
      (data: Autopart) => {
        this.dataSource.data.push(data);
        this.dataSource._updateChangeSubscription();
        this.toggleDrawer(false);
        this.dismissed = false;
      }
    );
  }

  // Metodo para eidtar un repuesto
  edit(autoPart : Autopart){
    this.sideTittle = "Editar repuesto";
    this.toggleDrawer(true);

    this.editObject = autoPart;

    this.autoPartForm.patchValue({
      id          : this.editObject.id,
      partModel   : this.editObject.partModel,
      drawer      : this.editObject.drawer,
      description : this.editObject.description,
      serialNumber: this.editObject.serialNumber,
    });

    // this.image =        this.editObject.image;
    this.selectedPartType =   this.editObject.partType.name;
    this.selectedCarBrand =   this.editObject.carBrand.name;
    this.selectedPartBrand =  this.editObject.partBrand.name;
  }

  mode(){
    return this.isEditAutoPart;
  }

  // Metodo para subir una imagen

  onChange(event: any) {
    this.image = event.target.files[0];
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
