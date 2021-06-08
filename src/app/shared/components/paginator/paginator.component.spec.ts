import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

import { PaginatorOperationCodeConstants } from '../../constants/pagination-operation-code-constants';

import { NavigationLinks } from '../../models/navigation-links';

const mockLinks: NavigationLinks = {
  first: 'http://localhost:3030/cities?filter=&limit=10',
  last: 'http://localhost:3030/cities?filter=&limit=10&offset=23010',
  next: 'http://localhost:3030/cities?filter=&limit=10&offset=20',
  prev: 'http://localhost:3030/cities?filter=&limit=10&offset=0'
};

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    
    component.navigationLinks = mockLinks;
    component.total = 23018;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onClickButton event with "first" page when the user does click on "first" button', () => {
    let onClickButtonSpy = spyOn(component.onClickButton, 'next');
    let button = fixture.debugElement.nativeElement.querySelector('#first');
    
    button.click();

    expect(onClickButtonSpy).toHaveBeenCalledWith(PaginatorOperationCodeConstants.FIRST);
  });

  it('should trigger onClickButton event with "prev" page when the user does click on "prev" button', () => {
    let onClickButtonSpy = spyOn(component.onClickButton, 'next');
    let button = fixture.debugElement.nativeElement.querySelector('#prev');
    
    button.click();

    expect(onClickButtonSpy).toHaveBeenCalledWith(PaginatorOperationCodeConstants.PREV);
  });

  it('should trigger onClickButton event with "next" page when the user does click on "next" button', () => {
    let onClickButtonSpy = spyOn(component.onClickButton, 'next');
    let button = fixture.debugElement.nativeElement.querySelector('#next');
    
    button.click();

    expect(onClickButtonSpy).toHaveBeenCalledWith(PaginatorOperationCodeConstants.NEXT);
  });

  it('should trigger onClickButton event with "last" page when the user does click on "last" button', () => {
    let onClickButtonSpy = spyOn(component.onClickButton, 'next');
    let button = fixture.debugElement.nativeElement.querySelector('#last');
    
    button.click();

    expect(onClickButtonSpy).toHaveBeenCalledWith(PaginatorOperationCodeConstants.LAST);
  });
});
