import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CityListResponse } from '../models/city-list-response';
import { PreferredCityListResponse } from '../models/preferred-city-list-response';
import { CityInfoView } from '../models/city-info-view';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  public getCityList(filter: string, limit?: number, offset?: number): Observable<CityListResponse> {
    const path = `${environment.api}cities?limit=${limit}&offset=${offset}&filter=${filter}`;
    return this.http.get<CityListResponse>(path);
  }

  public getCityListByPage(path: string): Observable<CityListResponse> {
    return this.http.get<CityListResponse>(path);
  }

  public getPreferredCities(): Observable<PreferredCityListResponse> {
    const path = `${environment.api}preferences/cities`;
    return this.http.get<PreferredCityListResponse>(path);
  }

  public patchFavoriteCity(city: CityInfoView): Observable<any> {
    const path = `${environment.api}preferences/cities`;
    const payload = {[city.geonameid]: city.checked };
    return this.http.patch<any>(path, payload)
  }
}
