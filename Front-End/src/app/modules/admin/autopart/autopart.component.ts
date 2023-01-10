import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowdialogComponent } from './showdialog/showdialog.component';
import { Autopart } from 'app/core/autopart/autopart';
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

  // Variables de la tabla
  displayedColumns: string[] = ['partType', 'partBrand', "carBrand", "partModel", "serialNumber", "stock", "drawer", "description", "image", 'actions'];
  dataSource: MatTableDataSource<Autopart>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  autoParts : Autopart[];

  // Variables del formulario
  autoPartForm !: FormGroup;
  configForm: FormGroup;
  editObject: Autopart = null;
  image: string = null;
  selectedPartType : PartType = null;
  selectedCarBrand : CarBrand = null;
  selectedPartBrand: PartBrand = null;

  // Variables de la alerta de (la que sale arriba a la izquierda)
  alertMessage: string = '';
  dismissed: boolean = true;
  alertType: string = 'success';

  // Variables de la alerta del eliminar
  dialogMessage: string = 'Esta seguro que desea eliminarla ? <span class="font-medium">Al eliminarla se borraran todos los repuestos vinculados con esta marca.</span>';
  viewAlert:boolean = false;

  // Variables del SideNav
  drawerOpened: boolean;
  sideTittle: string = 'Agregar repuesto';
  isEditAutoPart: boolean = false;

  // ============= Filtro =============
  
  partTypes : PartType[];
  selectedPartTypeFilter : PartType = null;
  
  carBrands : CarBrand[];
  selectedCarBrandFilter : CarBrand = null;
  
  partBrands : PartBrand[];
  selectedPartBrandFilter: PartBrand = null;

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

  // ==========================

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
        partType    : ['', Validators.required],
        partBrand   : [''],
        partModel   : ['', [Validators.maxLength(25)]],
        carBrand    : [''],
        serialNumber: ['', [Validators.maxLength(25)]],
        description : ['', [Validators.maxLength(200)]],
        drawer      : ['', [Validators.required, Validators.maxLength(10)]],
        image       : ['', [Validators.required]],
        stock       : ['', [Validators.required]]
    });

    // Get all autoparts
    this._autopartService.getAutoparts().subscribe(
      next => {
        this.autoParts = next;
        this.dataSource = new MatTableDataSource(this.autoParts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error => {
        this.setDialog(error.error.msg);
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
      next => {
        this.partTypes = next;
        this.partTypes.unshift({id: "0", name: ""});
      },
      error => {
        this.setDialog(error.error.msg);
      }
    );

    this._carBrandService.getCarBrands().subscribe(
      next => {
        this.carBrands = next;
        this.carBrands.unshift({id: "0", name: ""});
      },
      error => {
        this.setDialog(error.error.msg);
      }
    );
    
    this._partBrandService.getPartBrands().subscribe(
      next => {
        this.partBrands = next;
        this.partBrands.unshift({id: "0", name: ""});
      },
      error => {
        this.setDialog(error.error.msg);
      }
    );
  }

  // Metodo para crear el filtro
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      
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
    if (image == null) {
      image = this.image;
    }
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

  // ============ SideNav ============

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
        next => {
  
          // Esto deberia hacert que se recagrgue la tabla, pero no funca
  
          // this.dataSource.data.push(data);
          // this.dataSource._updateChangeSubscription();
          this.setAlert(`Se creo el repuesto "${this.autoPartForm.value.partModel}"`, "success");
        },
        error => {
          this.setDialog(error.error.msg);
        }
      );
    }
  
    // Metodo para eidtar un repuesto
    edit(autoPart : Autopart){
      this.sideTittle = "Editar repuesto";
      this.toggleDrawer(true);
      this.editObject = autoPart;
  
      this.autoPartForm.setValue({
        id          : autoPart.id,
        partModel   : autoPart.partModel,
        drawer      : autoPart.drawer,
        description : autoPart.description,
        serialNumber: autoPart.serialNumber,
        stock       : autoPart.stock,
        partType    : autoPart.partType,
        partBrand   : autoPart.partBrand,
        carBrand    : autoPart.carBrand,
        image       : null
      });
  
      this.image = autoPart.image;
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

    // Metodo para agregar un repuesto al stock
    addStock(){
      this._autopartService.addStock(this.editObject).subscribe(
        next => {
          this.editObject.stock = next.stock;
          this.setAlert(`Se sumo 1 al stock de " ${this.editObject.partModel} "`, "info");
        },
        error => {
          this.setDialog(error.error.msg);
        }
      );
    }

    // Metodo para quitar un repuesto al stock
    substracStock(){
      this._autopartService.substracStock(this.editObject).subscribe(
        next => {
          this.editObject.stock = next.stock;
          if (next.stock == 0) {
            this.dialogMessage = `Se agoto el stock de " ${this.editObject.partModel} "`;
            this.viewAlert= true;
            this.toggleDrawer(false);
          } else {
            this.setAlert(`Se resto 1 al stock del repuesto modelo " ${this.editObject.partModel} "`, "info");
          }
        },
        error => {
          this.setDialog(error.error.msg);
        }
      );
    }
    // ==================================

  // Metodo que setea los parametros de la alerta de arriba a la izquierda
  setAlert (message: string, type: string){
    this.alertMessage = message;
    this.alertType = type;
    this.toggleDrawer(false);
    this.dismissed = false;
  }

  // Metodo que muestra el dialog para mostrar el error
  setDialog (message: string){
    this.dialogMessage = message;
    this.viewAlert= true;
    this.toggleDrawer(false);
  }

  // Metodo que devuelve bool si el campo es null, lo uso para ver si muestro el ojito de la descripcion
  getStatus(value : any) {
    if(value != null){
      return true;
    }else{
      return false;
    }
  }

  // Metodo q muestra el dialog para agregar una autoparte
  mode(){
    return this.isEditAutoPart;
  }

  // Metodo para subir una imagen
  onChange(event: any) {
    this.image = event.target.files[0];
  }

  getViewAlert(){
    return this.viewAlert;
  }
}
