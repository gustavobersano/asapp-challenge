import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CityList } from '../models/city-list';
import { PreferredCityList } from '../models/preferred-city-list';
import { CityInfoView } from '../models/city-info-view';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  public getCityList(filter: string, limit?: number, offset?: number): Observable<CityList> {
    const path = `${environment.api}cities?limit=${limit}&offset=${offset}&filter=${filter}`;
    return this.http.get<CityList>(path);
  }

  public getCityListByPage(path: string): Observable<CityList> {
    return this.http.get<CityList>(path);
  }

  public getPreferredCities(): Observable<PreferredCityList> {
    const path = `${environment.api}preferences/cities`;
    return this.http.get<PreferredCityList>(path);
  }

  public patchFavoriteCity(city: CityInfoView): Observable<any> {
    const path = `${environment.api}preferences/cities`;
    const payload = {[city.geonameid]: city.checked };
    return this.http.patch<any>(path, payload)
  }
}
