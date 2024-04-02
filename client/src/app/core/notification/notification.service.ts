import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private apiErr$$ = new BehaviorSubject< HttpErrorResponse | null>(null);
  public apiErr$ = this.apiErr$$.asObservable();

  constructor() {}

  setError(error: HttpErrorResponse | null): void {
    this.apiErr$$.next(error);
  }
}
