import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CityItemComponent } from './city-item.component';

import { CityService } from '../../services/city.service';
import { MessageModalService } from '../message-modal/message-modal.service';

import { CityInfoView } from '../../models/city-info-view';
import { of, throwError } from 'rxjs';

const mockCity: CityInfoView = {
  country: 'Argentina',
  geonameid: 3427833,
  name: 'Tandil',
  subcountry: 'Buenos Aires',
  checked: false,
};

class MockCityService {
  patchFavoriteCity(city: CityInfoView) { return of(null); }
}

class MockMessageModalService {
  show(title: string, fisrtParagraph: string, secondParagraph: string) {}
}

describe('CityItemComponent', () => {
  let component: CityItemComponent;
  let fixture: ComponentFixture<CityItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CityItemComponent],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: CityService, useClass: MockCityService },
        { provide: MessageModalService, useClass: MockMessageModalService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityItemComponent);
    component = fixture.componentInstance;
    component.city = mockCity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call patchFavoriteCity when the user does click on checkbox and marked it as favorite', inject(
    [CityService], (cityService: CityService) => {
      spyOn(cityService, 'patchFavoriteCity').and.callThrough();
      let checkbox = fixture.debugElement.nativeElement.querySelector('.city-checkbox');
      let event = document.createEvent("HTMLEvents");
      event.initEvent('change', false, true);
      checkbox.checked = true;

      checkbox.dispatchEvent(event);

      const cityParam = { ...mockCity, checked: true };
      expect(cityService.patchFavoriteCity).toHaveBeenCalledWith(cityParam);
    }));

  it('should call patchFavoriteCity when the user does click on checkbox and marked it as not favorite', inject(
    [CityService], (cityService: CityService) => {
      spyOn(cityService, 'patchFavoriteCity').and.callThrough();
      let checkbox = fixture.debugElement.nativeElement.querySelector('.city-checkbox');
      let event = document.createEvent("HTMLEvents");
      event.initEvent('change', false, true);
      checkbox.checked = false;

      checkbox.dispatchEvent(event);

      const cityParam = { ...mockCity, checked: false };
      expect(cityService.patchFavoriteCity).toHaveBeenCalledWith(cityParam);
    }));

  it('should not update checkbox as checked when "patchFavoriteCity" API fail', inject(
    [CityService, MessageModalService], (cityService: CityService, messageModalService: MessageModalService) => {
      const mockError = {
        error: "Internal Server Error",
        message: "There is a glitch in the Matrix!",
        statusCode: 500
      }
      spyOn(cityService, 'patchFavoriteCity').and.returnValue(throwError(mockError));
      spyOn(messageModalService, 'show').and.callThrough();
      let checkbox = fixture.debugElement.nativeElement.querySelector('.city-checkbox');
      let event = document.createEvent("HTMLEvents");
      event.initEvent('change', false, true);
      
      checkbox.checked = true;
      checkbox.dispatchEvent(event);

      expect(cityService.patchFavoriteCity).toHaveBeenCalled();
      expect(messageModalService.show).toHaveBeenCalled();
      expect(component.city.checked).toBeFalse();
    }));

    it('should not update checkbox as unchecked when "patchFavoriteCity" API fail', inject(
      [CityService, MessageModalService], (cityService: CityService, messageModalService: MessageModalService) => {
        const mockError = {
          error: "Internal Server Error",
          message: "There is a glitch in the Matrix!",
          statusCode: 500
        }
        spyOn(cityService, 'patchFavoriteCity').and.returnValue(throwError(mockError));
        spyOn(messageModalService, 'show').and.callThrough();
        let checkbox = fixture.debugElement.nativeElement.querySelector('.city-checkbox');
        let event = document.createEvent("HTMLEvents");
        event.initEvent('change', false, true);
        component.city.checked = true;
        
        checkbox.checked = false;
        checkbox.dispatchEvent(event);
  
        expect(cityService.patchFavoriteCity).toHaveBeenCalled();
        expect(messageModalService.show).toHaveBeenCalled();
        expect(component.city.checked).toBeTrue();
      }));
});

