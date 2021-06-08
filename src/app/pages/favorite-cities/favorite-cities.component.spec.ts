import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { CityService } from 'src/app/shared/services/city.service';
import { MessageModalService } from 'src/app/shared/components/message-modal/message-modal.service';

import { FavoriteCitiesComponent } from './favorite-cities.component';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

import { CityListResponse } from 'src/app/shared/models/city-list-response';
import { PreferredCityListResponse } from 'src/app/shared/models/preferred-city-list-response';
import { CityInfoView } from 'src/app/shared/models/city-info-view';

import { PaginatorOperationCodeConstants } from 'src/app/shared/constants/pagination-operation-code-constants';

class MockCityService {
  getPreferredCities(): Observable<PreferredCityListResponse> {
    return of({
      'data': [3427833, 99738, 78428, 250420, 295721, 295657, 108512, 98822, 281165, 225284, 2747364, 2747351],
      'total': 12,
      'links': {
        'first': 'http://localhost:3030/preferences/cities',
        'last': 'http://localhost:3030/preferences/cities?limit=12&offset=0'
      }
    })
  }
  getCityList(filter?: string): Observable<CityListResponse> {
    return of({
      'data': [
        { 'country': 'Jordan', 'geonameid': 250799, 'name': '‘Ajlūn', 'subcountry': 'Ajlun' },
        { 'country': 'Israel', 'geonameid': 295721, 'name': '‘Akko', 'subcountry': 'Northern District' },
        { 'country': 'Iraq', 'geonameid': 99306, 'name': '‘Alī al Gharbī', 'subcountry': 'Maysan' },
        { 'country': 'Yemen', 'geonameid': 78428, 'name': '‘Amrān', 'subcountry': 'Omran' },
        { 'country': 'Iraq', 'geonameid': 98885, 'name': '‘Anat al Qadīmah', 'subcountry': 'Anbar' },
        { 'country': 'Jordan', 'geonameid': 250420, 'name': '‘Anjarah', 'subcountry': 'Ajlun' },
        { 'country': 'Iraq', 'geonameid': 98822, 'name': '‘Aqrah', 'subcountry': 'Nīnawá' },
        { 'country': 'Saudi Arabia', 'geonameid': 108512, 'name': '‘Ar‘ar', 'subcountry': 'Northern Borders' },
        { 'country': 'Israel', 'geonameid': 295657, 'name': '‘Arad', 'subcountry': 'Southern District' },
        { 'country': 'Syria', 'geonameid': 172256, 'name': '‘Ayn al ‘Arab', 'subcountry': 'Aleppo' }
      ],
      'total': 23018,
      'filter': '',
      'links': {
        'first': 'http://localhost:3030/cities?filter=&limit=10',
        'prev': 'http://localhost:3030/cities?filter=&limit=10&offset=0',
        'next': 'http://localhost:3030/cities?filter=&limit=10&offset=20',
        'last': 'http://localhost:3030/cities?filter=&limit=10&offset=23010'
      }
    })
  }
  getCityListByPage(path: string): Observable<CityListResponse> {
    return of({
      'data': [
        { 'country': 'United States', 'geonameid': 5855070, 'name': '‘Ewa Gentry', 'subcountry': 'Hawaii' },
        { 'country': 'Oman', 'geonameid': 287830, 'name': '‘Ibrī', 'subcountry': 'Az̧ Z̧āhirah' },
        { 'country': 'Syria', 'geonameid': 169372, 'name': '‘Irbīn', 'subcountry': 'Rif-dimashq' },
        { 'country': 'Egypt', 'geonameid': 355392, 'name': '‘Izbat al Burj', 'subcountry': 'Muḩāfaz̧at ad Daqahlīyah' },
        { 'country': 'Jordan', 'geonameid': 248923, 'name': '‘Izrā', 'subcountry': 'Karak' },
        { 'country': 'Algeria', 'geonameid': 2508309, 'name': '’Aïn Abid', 'subcountry': 'Constantine' },
        { 'country': 'Algeria', 'geonameid': 2508275, 'name': '’Aïn Benian', 'subcountry': 'Tipaza' },
        { 'country': 'Algeria', 'geonameid': 2508225, 'name': '’Aïn Deheb', 'subcountry': 'Tiaret' },
        { 'country': 'Algeria', 'geonameid': 2508184, 'name': '’Aïn el Bell', 'subcountry': 'Djelfa' },
        { 'country': 'Algeria', 'geonameid': 2508180, 'name': '’Aïn el Berd', 'subcountry': 'Sidi Bel Abbès' }
      ],
      'total': 23018,
      'filter': '',
      'links': {
        'first': 'http://localhost:3030/cities?filter=&limit=10',
        'prev': 'http://localhost:3030/cities?filter=&limit=10&offset=10',
        'next': 'http://localhost:3030/cities?filter=&limit=10&offset=30',
        'last': 'http://localhost:3030/cities?filter=&limit=10&offset=23010'
      }
    })
  }
}

class MockMessageModalService {
  show(title: string, fisrtParagraph: string, secondParagraph: string) { }
}

describe('FavoriteCitiesComponent', () => {
  let component: FavoriteCitiesComponent;
  let fixture: ComponentFixture<FavoriteCitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoriteCitiesComponent,
        PaginatorComponent,
        LoaderComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: CityService, useClass: MockCityService },
        { provide: MessageModalService, useClass: MockMessageModalService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get prefered city list when "oninit" method is called', fakeAsync(
    inject([CityService], (cityService: CityService) => {
      spyOn(cityService, 'getPreferredCities').and.callThrough();
      spyOn(cityService, 'getCityList').and.callThrough();

      component.ngOnInit();
      tick(2000);

      expect(cityService.getPreferredCities).toHaveBeenCalled();
      expect(cityService.getCityList).toHaveBeenCalled();

    })
  ));

  it('should display modal message when "getPreferredCities" API fail', fakeAsync(
    inject([CityService, MessageModalService], (cityService: CityService, messageModalService: MessageModalService) => {
      const mockError = {
        error: 'Internal Server Error',
        message: 'There is a glitch in the Matrix!',
        statusCode: 500
      }
      spyOn(cityService, 'getPreferredCities').and.returnValue(throwError(mockError));
      spyOn(messageModalService, 'show').and.callThrough();

      component.ngOnInit();
      tick(2000);

      expect(cityService.getPreferredCities).toHaveBeenCalled();
      expect(messageModalService.show).toHaveBeenCalled();
    })
  ));

  it('should display modal message when "getCityList" API fail', fakeAsync(
    inject([CityService, MessageModalService], (cityService: CityService, messageModalService: MessageModalService) => {
      const mockError = {
        error: 'Internal Server Error',
        message: 'There is a glitch in the Matrix!',
        statusCode: 500
      }
      spyOn(cityService, 'getPreferredCities').and.callThrough();
      spyOn(cityService, 'getCityList').and.returnValue(throwError(mockError));
      spyOn(messageModalService, 'show').and.callThrough();

      component.ngOnInit();
      tick(2000);

      expect(cityService.getPreferredCities).toHaveBeenCalled();
      expect(cityService.getCityList).toHaveBeenCalled();
      expect(messageModalService.show).toHaveBeenCalled();
    })
  ));

  it('should get a new page of cities when onClickButton is called', fakeAsync(
    inject([CityService], (cityService: CityService) => {
      spyOn(cityService, 'getCityListByPage').and.callThrough();

      component.onClickButton(PaginatorOperationCodeConstants.NEXT);

      expect(cityService.getCityListByPage).toHaveBeenCalled();
    })
  ));

  it('should display modal message when "getCityListByPage" API fail', fakeAsync(
    inject([CityService], (cityService: CityService) => {
      const mockError = {
        error: 'Internal Server Error',
        message: 'There is a glitch in the Matrix!',
        statusCode: 500
      }
      spyOn(cityService, 'getCityListByPage').and.returnValue(throwError(mockError));

      component.onClickButton(PaginatorOperationCodeConstants.NEXT);

      expect(cityService.getCityListByPage).toHaveBeenCalled();
    })
  ));

  it('should mark a city as favorite or not favorite when "updateFavoriteStatus" method is called', () => {
    expect(component.preferredCityList.findIndex(preferredCity => preferredCity === component.cityListView[0].geonameid)).toEqual(-1);

    component.updateFavoriteStatus(true, component.cityListView[0]);

    expect(component.preferredCityList.findIndex(preferredCity => preferredCity === component.cityListView[0].geonameid)).not.toEqual(-1);

    component.updateFavoriteStatus(false, component.cityListView[0]);

    expect(component.preferredCityList.findIndex(preferredCity => preferredCity === component.cityListView[0].geonameid)).toEqual(-1);
  });

  it('should keep preferred cities without changes when "updateFavoriteStatus" method is called to mark a non preferred city as not favorite', () => {
    const mockCity: CityInfoView = { 'country': 'Any country', 'geonameid': 9999999, 'name': 'Any city', 'subcountry': 'Any subcountry', checked: false };
    const amountPreferredCities = component.preferredCityList.length;
    
    component.updateFavoriteStatus(false, mockCity);

    expect(component.preferredCityList.length).toEqual(amountPreferredCities);
  });

  it('should call getCityList API when user change filter input value', fakeAsync( inject(
    [CityService], (cityService: CityService) => {
      spyOn(cityService, 'getCityList').and.callThrough();
      let event = document.createEvent("HTMLEvents");
      event.initEvent('keyup', false, true);

      component.input.nativeElement.value = 'Monaco';
      component.input.nativeElement.dispatchEvent(event);
      tick(2000);

      expect(cityService.getCityList).toHaveBeenCalled();
    })
  ));

});
