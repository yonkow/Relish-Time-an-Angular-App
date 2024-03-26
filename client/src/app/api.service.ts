import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/recipe';
import { User } from './types/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  recipes: Recipe[] = [];

  constructor(private http: HttpClient) {}


  getRecipesDateOrdered() {
    return this.http.get<Recipe[]>('/recipes')
  }

  likeRecipe(recipeId:string, likes:User[]) {
    return this.http.put<string>(`/recipes/${recipeId}/like`, likes)
  }
}
