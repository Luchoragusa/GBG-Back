import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartTypeService } from 'app/core/part-type/parttype.service';
import { PartType } from 'app/core/part-type/part-type';


@Component({
  selector: 'app-part-type',
  templateUrl: './part-type.component.html',
  styleUrls: ['./part-type.component.scss']
})
export class PartTypeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<PartType>;
  partTypeForm !: FormGroup;
  drawerOpened: boolean;
  sideTittle: string = 'Agregar tipo de repuesto';
  configForm: FormGroup;
  dismissed:boolean = true;
  viewAlert:boolean = false;

  dialogMessage: string = 'Esta seguro que desea eliminarlo ? <span class="font-medium">Al eliminarlo se borraran todos los repuestos vinculados con este tipo.</span>';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    private _partTypeService: PartTypeService
  ) {    
  }
  ngOnInit(): void {
    // Create the task form
    this.partTypeForm = this._formBuilder.group({
        id          : [''],
        name        : [''],
    });
    
    // Get all de part types
    this._partTypeService.getPartTypes().subscribe(
      (data: PartType[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    this.dismissed = false; // Esto muestra la alerta, hacer que lo haga despues de que se registra en la db
  }

  edit(partType : PartType){
    this.sideTittle = "Editar tipo de repuesto";
    this.toggleDrawer();

    this.partTypeForm.setValue({
      id: partType.id,
      name: partType.name
    });
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    if (!this.drawerOpened) {
      this.sideTittle = "Agregar tipo de repuesto";
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
}