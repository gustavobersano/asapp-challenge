import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityItemComponent } from './components/city-item/city-item.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';



@NgModule({
  declarations: [
    CityItemComponent,
    MessageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CityItemComponent,
    MessageModalComponent,
    FormsModule
  ]
})
export class SharedModule { }
