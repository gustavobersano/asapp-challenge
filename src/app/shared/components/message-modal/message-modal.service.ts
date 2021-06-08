import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {

  private subject: BehaviorSubject<boolean>;

  public isModalMessageVisible$: Observable<boolean>;

  public title: string;
 
  public fisrtParagraph: string;
  
  public secondParagraph: string;

  constructor() { 
    this.initContent();
    this.subject = new BehaviorSubject(false);
    this.isModalMessageVisible$ = this.subject.asObservable();
  }

  public show(title: string, fisrtParagraph: string, secondParagraph: string): void {
    this.title = title;
    this.fisrtParagraph = fisrtParagraph;
    this.secondParagraph = secondParagraph;
    this.subject.next(true);
  }

  public hide(): void {
    this.subject.next(false);
    this.initContent();
  }

  private initContent(): void {
    this.title = '';
    this.fisrtParagraph = '';
    this.secondParagraph = '';
  }
}
