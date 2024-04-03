import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  routeSubscription: Subscription = new Subscription();
  fetchLikedRecipesSubscription: Subscription = new Subscription();
  isHomePage: Boolean = false;

  constructor(
    private api: ApiService,
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchLikedRecipesSubscription = this.api.fetchLikedRecipes$.subscribe(
      (fetchLikedRecipes) => {
        if (fetchLikedRecipes) {
          this.fetchLikedRecipes();
        }
      }
    );

    this.routeSubscription = this.activatedRoute.url.subscribe((urlSegment) => {
      const currentPath = urlSegment.map((segment) => segment.path).join('/');
      if (currentPath === 'profile') {
        this.loadProfileRecipes();
      } else if (currentPath === '') {
        this.loadHomeRecipes();
      }
    });
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

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private loadProfileRecipes(): void {
    this.userService.getCreatedRecipesByUser().subscribe({
      next: (recipes) => {
        this.isProfile = true;
        this.recipes = recipes;
      },
      error: (err) => {
        console.error('Error fetching profile recipes: ', err);
      },
    });
  }

  private loadHomeRecipes(): void {
    this.isHomePage = !this.isHomePage;
    this.api.getRecipesDateOrdered().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.error('Error fetching home recipes: ', err);
      },
    });
  }

  fetchLikedRecipes() {
    this.userService.getLikedRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.error('Error fetching liked recipes: ', err);
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
