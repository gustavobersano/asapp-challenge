import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { CityService } from 'src/app/shared/services/city.service';

import { CityInfoView } from 'src/app/shared/models/city-info-view';
import { CityList } from 'src/app/shared/models/city-list';
import { PreferredCityList } from 'src/app/shared/models/preferred-city-list';

@Component({
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.scss']
})
export class FavoriteCitiesComponent implements OnInit {

  public limit: number;

  public offset: number;

  public filter: string;

  public cityListView: Array<CityInfoView>;

  public preferredCityList: Array<number>;

  public cityListResponse: CityList;

  constructor(private cityService: CityService) {
    this.limit = 10;
    this.offset = 0;
    this.filter = '';
  }

  ngOnInit() {

    const observables: [Observable<PreferredCityList>, Observable<CityList>] = [
      this.cityService.getPreferredCities(),
      this.cityService.getCityList('', this.limit, this.offset)];

    forkJoin(observables).subscribe(
      responses => {
        this.preferredCityList = responses[0].data;
        this.cityListResponse = responses[1];
        this.cityListView = this.cityListResponse.data.map(
          city => {
            return { ...city, checked: !!this.preferredCityList.find(preferedCity => preferedCity === city.geonameid) }
          }
        );
        console.log(responses);
      }
    );
  }

}
