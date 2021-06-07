import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityItemComponent } from './components/city-item/city-item.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';



@NgModule({
  declarations: [
    CityItemComponent,
    MessageModalComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CityItemComponent,
    MessageModalComponent,
    PaginatorComponent,
    FormsModule
  ]
})
export class SharedModule { }
