import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  mergeMap,
  switchMap,
  tap
} from 'rxjs/operators';

import { CityService } from 'src/app/shared/services/city.service';
import { MessageModalService } from 'src/app/shared/components/message-modal/message-modal.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

import { CityInfoView } from 'src/app/shared/models/city-info-view';
import { NavigationLinks } from 'src/app/shared/models/navigation-links';
import { CityInfo } from 'src/app/shared/models/city-info';

import { PaginatorOperationCodeConstants } from 'src/app/shared/constants/pagination-operation-code-constants';

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

  public navigationLinks: NavigationLinks;

  public total: number;

  public isLoading: boolean;

  constructor(
    private cityService: CityService,
    private messageModalService: MessageModalService,
    public loaderService: LoaderService) {
    this.limit = 10;
    this.offset = 0;
    this.filter = '';
    this.cityListView = [];
    this.preferredCityList = [];
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.cityService.getPreferredCities().pipe(
      tap(preferredCityListResponse => { this.preferredCityList = preferredCityListResponse.data; }),
      catchError(error => {
        this.messageModalService.show(error.error.error, error.error.message, 'It was not possible to get your favorite cities. Please refresh the page.');
        return of(null);
      }),
      mergeMap(() => this.getCityList(''))
    ).subscribe(
      cityListView => { this.cityListView = cityListView; }
    );

  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.loaderService.show()),
        switchMap(filterValue => this.getCityList(filterValue))
      ).subscribe(
        res => this.cityListView = res
      );
  }

  getCityList(filterValue: string = ''): Observable<Array<CityInfoView>> {
    return this.cityService.getCityList(filterValue, this.limit, this.offset).pipe(
      tap(cityListResponse => {
        this.total = cityListResponse.total;
        this.navigationLinks = cityListResponse.links;
      }),
      map(cityListResponse => cityListResponse.data),
      map(
        this.markFavoriteCities
      ),
      catchError(error => {
        this.messageModalService.show(error.error.error, error.error.message, 'It was not possible to get the list of cities.');
        return of([]);
      }),
      finalize(() => this.loaderService.hide())
    );
  }

  onClickButton(event: string): void {
    const paginatorPaths = {
      [PaginatorOperationCodeConstants.FIRST]: this.navigationLinks.first,
      [PaginatorOperationCodeConstants.PREV]: this.navigationLinks.prev,
      [PaginatorOperationCodeConstants.NEXT]: this.navigationLinks.next,
      [PaginatorOperationCodeConstants.LAST]: this.navigationLinks.last
    };
    this.loaderService.show();
    this.cityService.getCityListByPage(paginatorPaths[event]).pipe(
      tap(cityListResponse => {
        this.total = cityListResponse.total;
        this.navigationLinks = cityListResponse.links;
      }),
      map(cityListResponse => cityListResponse.data),
      map(
        this.markFavoriteCities
      ),
      catchError(error => {
        this.messageModalService.show(error.error.error, error.error.message, 'It was not possible to get the page with the list of cities.');
        return of(this.cityListView);
      }),
      finalize(() => this.loaderService.hide())
    ).subscribe(
      res => this.cityListView = res
    );
  }

  markFavoriteCities = (cityList: Array<CityInfo>): Array<CityInfoView> => {
    return cityList.map(
      city => {
        return { ...city, checked: !!this.preferredCityList.find(preferedCity => preferedCity === city.geonameid) }
      }
    )
  }

  updateFavoriteStatus(status: boolean, city: CityInfoView): void {
    if (status) {
      this.preferredCityList.push(city.geonameid);
    } else {
      const index = this.preferredCityList.findIndex(e => e === city.geonameid);
      if (index > -1) {
        this.preferredCityList.splice(index, 1);
      }
    }
  }

}
