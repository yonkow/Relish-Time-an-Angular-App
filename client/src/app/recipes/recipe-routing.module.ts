import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthActivate]
  },
  {
    path: ':recipeId',
    component: RecipeDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RecipeRoutingModule { }
