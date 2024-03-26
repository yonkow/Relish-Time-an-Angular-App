import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
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

  constructor(private api: ApiService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.api.getRecipesDateOrdered().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        console.log(recipes);
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  like(recipeId: string, likes:User[]) {
    likes.push(this.userService.user as User)
    this.api.likeRecipe(recipeId, likes).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  isOwner(recipeOwner: string) {
    if (recipeOwner === this.userService.user?.id) {
      return false;
    }
    return true;
  }
}
