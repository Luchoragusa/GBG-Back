import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CarBrand } from 'app/core/car-brand/Car-brand';
import { CarBrandService } from 'app/core/car-brand/carbrand.service';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.scss']
})

export class CarBrandComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<CarBrand>;
  drawerMode: 'side' | 'over';
  carBrandForm !: FormGroup;
  configForm: FormGroup;
  drawerOpened: boolean;
  dismissed: boolean = true;
  sideTittle: string = 'Agregar marca de auto';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('settingsDrawer', {static: true}) settingsDrawer: MatDrawer;

  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _carBrandService: CarBrandService,
  ) {
  }
  ngOnInit(): void {
    // Create the car brand form
    this.carBrandForm = this._formBuilder.group({
        id          : [''],
        name        : [''],
    });

    // Get all de car brands
    const partTypes = this._carBrandService.getCarBrands();
    this.dataSource = new MatTableDataSource(partTypes)

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

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    if (!this.drawerOpened) {
      this.sideTittle = "Agregar marca de auto";
    }
  }

  edit(){
    this.sideTittle = "Editar marca de auto";
    this.toggleDrawer();
  }

  saveCarBrand(){
    this.dismissed = false; // Esto muestra la alerta, hacer que lo haga despues de que se registra en la db
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
