import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private subject: BehaviorSubject<boolean>;

  public isLoading$: Observable<boolean>;

  constructor() { 
    this.subject = new BehaviorSubject(false);
    this.isLoading$ = this.subject.asObservable();
  }

  public show() {
    this.subject.next(true);
  }

  public hide() {
    this.subject.next(false);
  }

}
