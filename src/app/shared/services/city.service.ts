import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CityList } from '../models/city-list';

import { environment } from 'src/environments/environment';
import { PreferredCityList } from '../models/preferred-city-list';

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
}
