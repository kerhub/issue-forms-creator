import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private populateSubject: Subject<void> = new Subject<void>();
  populate$: Observable<void> = this.populateSubject.asObservable();

  populate(): void {
    this.populateSubject.next();
  }
}
