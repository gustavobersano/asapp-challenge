import { Component, EventEmitter, Input, Output } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { CityService } from '../../services/city.service';
import { MessageModalService } from '../message-modal/message-modal.service';
import { LoaderService } from '../loader/loader.service';

import { CityInfoView } from '../../models/city-info-view';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent {
  @Input() city: CityInfoView;
  @Output() updateFavoriteStatus  = new EventEmitter<boolean>();

  constructor(
    private cityService: CityService,
    private messageModalService: MessageModalService,
    public loaderService: LoaderService) { }

  onChange(city: CityInfoView): void {
    this.loaderService.show();
    this.cityService.patchFavoriteCity(city).pipe(
      tap(() => this.updateFavoriteStatus.next(this.city.checked)),
      catchError( error => {
        const status = city.checked? 'favorite' : 'not favorite';
        city.checked = !city.checked;
        this.messageModalService.show(error.error.error, error.error.message, `It was not possible to mark "${this.city.name} - ${this.city.country}" as ${status}.`);
        return of(null);
      }),
      finalize(() => this.loaderService.hide())
    ).subscribe();
  }

}
