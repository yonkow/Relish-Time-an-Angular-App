import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _fetchLikedRecipes = new BehaviorSubject<boolean>(false);
  fetchLikedRecipes$ = this._fetchLikedRecipes.asObservable();

  constructor(private http: HttpClient) {}

  getRecipesDateOrdered() {
    return this.http.get<Recipe[]>('/recipes');
  }

  setFetchLikedRecipes(value: boolean) {
    this._fetchLikedRecipes.next(value);
  }
}
