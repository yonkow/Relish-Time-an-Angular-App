import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Recipe } from '../types/recipe';
import { Router } from '@angular/router';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipe$$ = new BehaviorSubject<Recipe | undefined>(undefined);
  private recipe$ = this.recipe$$.asObservable();

  recipe: Recipe | undefined;

  recipeSubsription: Subscription;

  showEditMode: boolean = false;

  constructor(private http: HttpClient) {
    this.recipeSubsription = this.recipe$.subscribe((recipe) => {
      this.recipe = recipe;
    });
  }

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
    return this.http.put<Recipe>(`/recipes/${recipeId}/like`, { user }).pipe(
      tap((recipe) => {
        this.recipe$$.next(recipe);
      })
    );
  }

  getRecipe(recipeId: string) {
    return this.http.get<Recipe>(`/recipes/${recipeId}`).pipe(
      tap((recipe) => {
        this.recipe$$.next(recipe);
      })
    );
  }

  editRecipe(
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
    return this.http
      .put<Recipe>(`/recipes/${this.recipe?._id}`, {
        name,
        level,
        mealType,
        time,
        ingredients,
        description,
        calories,
        image,
        user,
      })
      .pipe(
        tap((recipe) => {
          this.recipe$$.next(recipe);
        })
      );
  }

  toggleEditMode() {
    this.showEditMode = !this.showEditMode;
  }
}
