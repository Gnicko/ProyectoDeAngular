import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrandsRoutingModule} from './brands-routing.module';
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    MaterialModule
  ]
})
export class BrandsModule {
}
