import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {

  private subject: BehaviorSubject<boolean>;

  public isModalMessageVisible$: Observable<boolean>;

  public title: string;

  public body: string;


  constructor() { 
    this.title = '';
    this.body = '';
    this.subject = new BehaviorSubject(false);
    this.isModalMessageVisible$ = this.subject.asObservable();
  }

  public show(title: string, body: string) {
    this.title = title;
    this.body = body;
    this.subject.next(true);
  }

  public hide() {
    this.subject.next(false);
    this.title = '';
    this.body = '';
  }
}
