import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AutopartComponent } from './autopart.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { FuseDrawerModule } from '@fuse/components/drawer';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { ShowdialogComponent } from './showdialog/showdialog.component';


const autopartRoutes: Route[] = [
  {
      path     : '',
      component: AutopartComponent
  }
];

@NgModule({
  declarations: [
    ShowdialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(autopartRoutes) ,
    MatSidenavModule,
    MatDividerModule,
    FuseDrawerModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class AutopartModule { }
