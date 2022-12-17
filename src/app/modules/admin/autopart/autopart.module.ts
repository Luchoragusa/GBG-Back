import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AutopartComponent } from './autopart.component';
import { FormPartComponent } from './form-part/form-part.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';


const autopartRoutes: Route[] = [
  {
      path     : '',
      component: AutopartComponent
  }
];

@NgModule({
  declarations: [
    FormPartComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(autopartRoutes) ,
    MatSidenavModule,
    MatDividerModule
  ]
})
export class AutopartModule { }
