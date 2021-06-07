import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessageModalComponent } from './message-modal.component';

describe('MessageModalComponent', () => {
  let component: MessageModalComponent;
  let fixture: ComponentFixture<MessageModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide modal when the user does click on background', () => {
    let onHideSpy = spyOn(component.messageModalService, 'hide');
    let background = fixture.debugElement.nativeElement.querySelector('.modal-background');
    
    background.click();

    expect(onHideSpy).toHaveBeenCalled();
  });
});
