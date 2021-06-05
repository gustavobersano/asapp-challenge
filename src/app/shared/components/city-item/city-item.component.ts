import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { CityService } from '../../services/city.service';

import { CityInfoView } from '../../models/city-info-view';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.scss']
})
export class CityItemComponent {
  @Input() city: CityInfoView;

  constructor(private cityService: CityService) { }

  onChange(city: CityInfoView): void {
    this.cityService.patchFavoriteCity(city).pipe(
      retry(2), // retry 2 times on error
      catchError( error => {
        city.checked = !city.checked;
        // TODO: Inform error message
        return of(error);
      })
    ).subscribe();
    console.log(city);
  }

}
