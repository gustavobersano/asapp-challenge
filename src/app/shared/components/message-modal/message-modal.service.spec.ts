import { TestBed } from '@angular/core/testing';

import { MessageModalService } from './message-modal.service';

describe('MessageModalService', () => {
  let service: MessageModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger true when "show" method is called', () => {
    let onShowSpy = spyOn(service['subject'], 'next');

    service.show('title', 'first paragraph', 'second paragraph');

    expect(onShowSpy).toHaveBeenCalledWith(true);
  });

  it('should trigger false when "hide" method is called', () => {
    let onShowSpy = spyOn(service['subject'], 'next');

    service.hide();

    expect(onShowSpy).toHaveBeenCalledWith(false);
  });
});
