import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/types/recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  descriptionArr: string[] | undefined;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchRecipe();
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  fetchRecipe(): void {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];

    this.recipeService.getOneRecipe(recipeId).subscribe((currentRecipe) => {
      this.regroup(currentRecipe);
      this.recipe = currentRecipe;
      console.log(this.recipe);
    });
  }

  regroup(currentRecipe: Recipe): void {
    const ingredients = currentRecipe.ingredients.toString();
    currentRecipe.ingredients = ingredients.split('\n');
    this.descriptionArr = currentRecipe.description.split('\n');
  }
}
