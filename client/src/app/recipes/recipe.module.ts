import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SharedModule } from "../shared/shared.module";
import { CommentsComponent } from '../shared/comments/comments.component';



@NgModule({
    declarations: [
        CreateComponent,
        RecipeDetailsComponent,
        CommentsComponent,
    ],
    exports: [RecipeRoutingModule],
    imports: [
        CommonModule,
        RecipeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        SharedModule
    ]
})
export class RecipesModule { }
