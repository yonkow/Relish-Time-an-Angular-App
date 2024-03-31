import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isProfile: Boolean = false;

  constructor(
    private api: ApiService,
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    
    if (this.activatedRoute.component!.name === 'ProfileComponent'){
      this.userService.getUserCreatedRecipes().subscribe({
        next: (recipes) => {
          this.isProfile = true
          this.recipes = recipes;
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
    } else if (this.activatedRoute.component!.name === 'HomeComponent') {
      this.api.getRecipesDateOrdered().subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        },
        error: (err) => {
          console.error('Error: ', err);
        },
      });
    }
  }

  like(recipeId: string, likes: User[]) {
    const user = this.userService.user;
    return this.recipeService.likeRecipe(recipeId, user as User).subscribe({
      next: () => {
        likes.push(user as User);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  isOwner(recipeOwner: string) {
    if (recipeOwner === this.userService.user?._id || !this.userService.user) {
      return true;
    }
    return false;
  }

  isAlreadyLikeIt(likes: User[]) {
    return likes.some((element) => element._id === this.userService.user?._id);
  }
}
