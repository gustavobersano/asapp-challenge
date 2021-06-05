import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  switchMap,
  tap
} from 'rxjs/operators';

import { CityService } from 'src/app/shared/services/city.service';

import { CityInfoView } from 'src/app/shared/models/city-info-view';

@Component({
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.scss']
})
export class FavoriteCitiesComponent implements OnInit, AfterViewInit {
  @ViewChild('filterInput', { static: true }) input: ElementRef;

  public limit: number;

  public offset: number;

  public filter: string;

  public cityListView: Array<CityInfoView>;

  public preferredCityList: Array<number>;

  constructor(private cityService: CityService) {
    this.limit = 10;
    this.offset = 0;
    this.filter = '';
    this.cityListView = [];
    this.preferredCityList = [];
  }

  ngOnInit(): void {
    this.cityService.getPreferredCities().pipe(
      tap(preferredCityResponse => { this.preferredCityList = preferredCityResponse.data; }),
      mergeMap(() => this.getCityList(''))
    ).subscribe(
      cityListView => this.cityListView = cityListView,
      error => {
        // TODO: Inform error message
          console.log(error)
      }
    );
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(filterValue => this.getCityList(filterValue))
      ).subscribe(
        res => this.cityListView = res,
        error => {
          // TODO: Inform error message
          console.log(error)
        }
      );
  }

  getCityList(filterValue: string = ''): Observable<Array<CityInfoView>> {
    return this.cityService.getCityList(filterValue, this.limit, this.offset).pipe(
      map(
        cityList => cityList.data.map(
          city => {
            return { ...city, checked: !!this.preferredCityList.find(preferedCity => preferedCity === city.geonameid) }
          }
        )
      )
    );
  }

}
