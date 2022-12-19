import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AutopartService } from 'app/core/autopart/autopart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';

export interface UserData {
  id: string;
  name: string;
}

/** Constants used to fill up our data base. */
const names: string[] = [
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


@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.scss']
})

export class CarBrandComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  drawerMode: 'side' | 'over';
  autoPartForm !: FormGroup;
  configForm: FormGroup;
  drawerOpened: boolean;
  dismissed: boolean = true;
  sideTittle: string = 'Agregar Marca de Auto';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('settingsDrawer', {static: true}) settingsDrawer: MatDrawer;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _autoPartService: AutopartService,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _fuseAlertService: FuseAlertService,
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

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  edit(){
    this.sideTittle = "Editar marca de Auto";
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    names[Math.round(Math.random() * (names.length - 1))];

  return {
    id: id.toString(),
    name: name,
  };
}
