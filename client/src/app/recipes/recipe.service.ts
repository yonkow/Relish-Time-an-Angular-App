import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Recipe } from '../types/recipe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  create(
    name: string,
    level: string,
    mealType: string,
    time: number,
    ingredients: string,
    description: string,
    calories: string,
    image: string
  ) {
    return this.http
      .post<Recipe>('/recipes/create', {
        name,
        level,
        mealType,
        time,
        ingredients,
        image,
        description,
        calories,
      })
  }
}
