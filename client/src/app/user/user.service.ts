import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerData: string = '';

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
}
