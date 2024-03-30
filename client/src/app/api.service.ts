import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/recipe';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, ) {}

  getRecipesDateOrdered() {
    return this.http.get<Recipe[]>('/recipes');
  }
}
