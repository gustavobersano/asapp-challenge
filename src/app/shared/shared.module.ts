import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityItemComponent } from './components/city-item/city-item.component';



@NgModule({
  declarations: [
    CityItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CityItemComponent,
    FormsModule
  ]
})
export class SharedModule { }
