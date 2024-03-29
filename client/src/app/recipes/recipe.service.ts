import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Recipe } from '../types/recipe';
import { Router } from '@angular/router';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  create(
    name: string,
    level: string,
    mealType: string,
    time: number,
    ingredients: string,
    description: string,
    calories: string,
    image: string,
    user: User
  ) {
    return this.http.post<Recipe>('/recipes/create', {
      name,
      level,
      mealType,
      time,
      ingredients,
      image,
      description,
      calories,
      owner: user,
    });
  }

  likeRecipe(recipeId: string, user: User) {
    return this.http.put<string>(`/recipes/${recipeId}/like`, { user });
  }

  getOneRecipe(recipeId: string) {
    return this.http.get<Recipe>(`recipes/${recipeId}`)
  }
}
