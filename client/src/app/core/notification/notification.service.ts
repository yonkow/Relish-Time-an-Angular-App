import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiErr$$ = new BehaviorSubject(null);
  public apiErr$ = this.apiErr$$.asObservable();

  constructor() {}

  setError(error: any): void {
    this.apiErr$$.next(error);
  }
}
