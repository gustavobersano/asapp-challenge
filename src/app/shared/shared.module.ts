import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityItemComponent } from './components/city-item/city-item.component';



@NgModule({
  declarations: [
    CityItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CityItemComponent
  ]
})
export class SharedModule { }
