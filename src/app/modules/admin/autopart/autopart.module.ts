import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AutopartComponent } from './autopart.component';


const autopartRoutes: Route[] = [
  {
      path     : '',
      component: AutopartComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(autopartRoutes) 
  ]
})
export class AutopartModule { }
