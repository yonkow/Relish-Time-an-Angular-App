import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Recipe } from '../types/recipe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubscription = this.user$
    .subscribe((user) => {      
      this.user = user;
      // console.log(this.user)
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    const data = this.http
      .post<User>('/auth/register', { username, email, password, rePassword})
      .pipe(tap((user) => {this.user$$.next(user)}));

    return data;
  }

  login(email: string, password: string) {
    return this.http
    .post<User>('/auth/login', { email, password })
    .pipe(tap((user) => {this.user$$.next(user)}))
  }

  logout() {
    return this.http
    .post<User>('/auth/logout', {})
    .pipe(tap(() => {this.user$$.next(undefined)})
    );
  }

  getProfile() {
    return this.http
      .get<User>('/auth/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getUserCreatedRecipes() {
    const userId = this.user?._id
    if(!userId) {
      throw new Error('There is not User!')
    }
    
    return this.http.get<Recipe[]>(`/recipes/profile/${userId}`);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
