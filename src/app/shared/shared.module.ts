import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityItemComponent } from './components/city-item/city-item.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    CityItemComponent,
    MessageModalComponent,
    PaginatorComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CityItemComponent,
    MessageModalComponent,
    PaginatorComponent,
    LoaderComponent,
    FormsModule
  ]
})
export class SharedModule { }
