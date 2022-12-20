import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PartBrand } from 'app/core/part-brand/part-brand';
import { PartBrandService } from 'app/core/part-brand/parbrand.service';


@Component({
  selector: 'app-part-brand',
  templateUrl: './part-brand.component.html',
  styleUrls: ['./part-brand.component.scss']
})
export class PartBrandComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<PartBrand>;
  partBrandForm !: FormGroup;
  drawerOpened: boolean;
  sideTittle: string = 'Agregar marca de repuesto';
  configForm: FormGroup;
  dismissed:boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _partBrandService: PartBrandService,
  ) {
  }
  ngOnInit(): void {
    // Create the task form
    this.partBrandForm = this._formBuilder.group({
        id          : [''],
        name        : [''],
    });

    // Get all de part types
    const partBrands = this._partBrandService.getPartBrands();
    this.dataSource = new MatTableDataSource(partBrands)
    
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

  savePartBrand(){
    this.dismissed = false; // Esto muestra la alerta, hacer que lo haga despues de que se registra en la db
  }

  edit(){
    this.sideTittle = "Editar marca de repuesto";
    this.toggleDrawer();
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    if (!this.drawerOpened) {
      this.sideTittle = "Agregar marca de repuesto";
    }
  }

  delete(name : string) {
    console.log(name);
        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
  }
}
