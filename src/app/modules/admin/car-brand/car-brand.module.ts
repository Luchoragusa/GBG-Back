import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {FuseDrawerModule} from '@fuse/components/drawer';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { CarBrandComponent } from './car-brand.component';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { FuseAlertModule } from '@fuse/components/alert';


const carBrandRoutes: Route[] = [
  {
      path     : '',
      component: CarBrandComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(carBrandRoutes),
    MatSidenavModule,
    MatDividerModule,
    FuseDrawerModule,
    MatIconModule,
    MatSelectModule,
    FuseConfirmationModule,
    FuseAlertModule
  ]
})
export class CarBrandModule { }