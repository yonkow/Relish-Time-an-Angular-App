import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Recipe } from '../types/recipe';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { CommentRecipe } from '../types/comment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipe$$ = new BehaviorSubject<Recipe | undefined>(undefined);
  private recipe$ = this.recipe$$.asObservable();

  recipe: Recipe | undefined;
  recipeSubsription: Subscription;
  isOwner: boolean = false;
  showEditMode: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {
    this.recipeSubsription = this.recipe$.subscribe((recipe) => {
      this.recipe = recipe;
      this.isOwner =
        this.recipe?.owner._id === this.userService.user?._id || false;
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

  deleteRecipe() {
    return this.http.delete<Recipe>(`/recipes/${this.recipe?._id}`).pipe(
      tap(() => {
        this.recipe$$.next(undefined);
      })
    );
  }

  toggleEditMode() {
    this.showEditMode = !this.showEditMode;
  }

  fetchComments(recipeId: string) {
    if (!recipeId) {
      throw new Error('Recipe ID is required.');
    }

    return this.http.get<CommentRecipe[]>('/comments', {
      headers: { recipeId },
    });
  }

  addComment(content: string) {
    const recipe = this.recipe?._id;
    const owner = this.userService.user?._id;

    if (!owner) {
      throw new Error('User not found!');
    }
    return this.http.post<CommentRecipe>('/comments/create', {
      content,
      recipe,
      owner,
    });
  }
}
