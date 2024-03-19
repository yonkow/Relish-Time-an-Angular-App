import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { RecipesRoutingModule } from './recipes-routing.module';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  exports: [RecipesRoutingModule]
})
export class RecipesModule { }
