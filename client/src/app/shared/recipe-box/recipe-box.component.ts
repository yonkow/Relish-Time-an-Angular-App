import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from 'src/app/types/recipe';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-box',
  templateUrl: './recipe-box.component.html',
  styleUrls: ['./recipe-box.component.scss'],
})
export class RecipeBoxComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private api: ApiService,
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getRecipesDateOrdered().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  like(recipeId: string) {
    const user = this.userService.user;
    this.recipeService.likeRecipe(recipeId, user as User).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  isOwner(recipeOwner: string) {
    if (recipeOwner === this.userService.user?._id) {
      return true;
    }
    return false;
  }

  isAlreadyLikeIt(likes: User[]) {
    return likes.some((element) => element._id === this.userService.user?._id);
  }

  recipeDetails() {
    this.router.navigate(['recipe/details'])
  }
}
