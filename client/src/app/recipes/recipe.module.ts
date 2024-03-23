import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { RecipeRoutingModule } from './recipe-routing.module';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ],
  exports: [RecipeRoutingModule]
})
export class RecipesModule { }
