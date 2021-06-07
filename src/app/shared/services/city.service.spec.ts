import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CityService } from './city.service';

import { environment } from 'src/environments/environment';
import { CityInfoView } from '../models/city-info-view';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET HTTP request to "/cities" when getCityList is called', () => {
    const filter = 'Monaco';
    const limit = 10;
    const offset = 0;

    service.getCityList(filter, limit, offset).subscribe(data => { });

    const req = httpMock.expectOne(`${environment.api}cities?limit=${limit}&offset=${offset}&filter=${filter}`);
    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  });

  it('should make a GET HTTP request to "/cities" when getCityListByPage is called', () => {
    const path = `${environment.api}cities?filter=&limit=10&offset=10`;

    service.getCityListByPage(path).subscribe(data => { });

    const req = httpMock.expectOne(path);
    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  });

  it('should make a GET HTTP request to "/preferences/cities" when getPreferredCities is called', () => {

    service.getPreferredCities().subscribe(data => { });

    const req = httpMock.expectOne(`${environment.api}preferences/cities`);
    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  });

  it('should make a PATCH HTTP request to "/preferences/cities" when patchFavoriteCity is called', () => {
    const city: CityInfoView = {
      country: 'Argentina',
      geonameid: 3427833,
      name: 'Tandil',
      subcountry: 'Buenos Aires',
      checked: true,
    };
    service.patchFavoriteCity(city).subscribe(data => { });

    const req = httpMock.expectOne(`${environment.api}preferences/cities`);
    expect(req.request.method).toEqual('PATCH');
    httpMock.verify();
  });
});
