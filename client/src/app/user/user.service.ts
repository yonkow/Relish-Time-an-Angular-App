import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http.post<User>('/users/register', {
      username,
      email,
      password,
      rePassword,
    });
  }

  login(email: string, password: string) {
    return this.http.post<User>('/users/login', { email, password });
  }

  logout() {
    return this.http.post<User>('/users/logout', {}).subscribe({
      next: () => this.router.navigate(['']),
      error: () => this.router.navigate(['']),
    });
  }
}
