import {Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartBrand } from 'app/core/part-brand/part-brand';
import { PartBrandService } from 'app/core/part-brand/parbrand.service';


@Component({
  selector: 'app-part-brand',
  templateUrl: './part-brand.component.html',
  styleUrls: ['./part-brand.component.scss']
})
export class PartBrandComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<PartBrand>;
  partBrandForm !: FormGroup;
  drawerOpened: boolean;
  sideTittle: string = 'Agregar marca de repuesto';
  configForm: FormGroup;
  dismissed:boolean = true;
  viewAlert:boolean = false;
  isEdit: boolean = false;
  buttonStatus: boolean = false;

  partBrands : PartBrand[];

  dialogMessage: string = 'Esta seguro que desea eliminarla ? <span class="font-medium">Al eliminarla se borraran todos los repuestos vinculados con este marca.</span>';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _formBuilder: FormBuilder,
    private _partBrandService: PartBrandService,
  ) {
  }
  ngOnInit(): void {
    // Create the task form
    this.partBrandForm = this._formBuilder.group({
        id          : [''],
        name        : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });

    // Get all de part types
    this._partBrandService.getPartBrands().subscribe(
      next => {
        this.partBrands = next;
        this.dataSource = new MatTableDataSource(this.partBrands);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        if (error.status == 500) {
          this.setDialog(error.error.msg);
        }
        this.setDialog("Error de conexion con el servidor");
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  savePartBrand(){
    if(this.isEdit){
      // Update
    }else{
      // Create
     this.buttonStatus = true;
     const pb = {
        name: this.partBrandForm.value.name
     }

      this._partBrandService.createPartBrand(pb).subscribe(
        next => {
          this.dataSource.data.push(next); // Esto es para que se vea en la tabla
          this.dataSource._updateChangeSubscription(); // Esto es para que se vea en la tabla
          this.toggleDrawer();
          this.dismissed = false; // Esto muestra la alerta, hacer que lo haga despues de que se registra en la db
          this.buttonStatus = false;
        },
        error => {
          if (error.status == 500) {
            this.setDialog(error.error.msg);
          }
          this.setDialog("Error de conexion con el servidor");
        }
      );
    }
  }

  edit(partBrand : PartBrand){
    this.sideTittle = "Editar marca de repuesto";
    this.toggleDrawer();

    this.partBrandForm.setValue({
      id: partBrand.id,
      name: partBrand.name,
    });
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    if (!this.drawerOpened) {
      this.sideTittle = "Agregar marca de repuesto";
    }
  }

  delete(data : any) {
    this.viewAlert = true; // Esto muestra la alerta, hacer que lo haga despues de que se registra en la db

    // Depues tengo q hacer q se ponga en false, sino no abre mas el dialog
    // this.viewAlert = false;
  }

  getViewAlert(){
    return this.viewAlert;
  }

  // Metodo que muestra el dialog para mostrar el error
  setDialog (message: string){
    this.dialogMessage = message;
    this.viewAlert= true;
    this.toggleDrawer();
  }
}
