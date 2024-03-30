import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/types/recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  descriptionArr: string[] | undefined;
  ingredients: string[] | undefined;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchRecipe();
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  fetchRecipe(): void {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];

    this.recipeService.getRecipe(recipeId).subscribe((currentRecipe) => {
      this.regroup(currentRecipe);
      this.recipe = currentRecipe;
    });
  }

  regroup(currentRecipe: Recipe): void {
    this.ingredients = currentRecipe.ingredients.toString().split('\n');
    this.descriptionArr = currentRecipe.description.split('\n');
  }

  onEdit():void {
    this.recipeService.toggleEditMode()
    this.router.navigate(['recipes/create'])
  }
}