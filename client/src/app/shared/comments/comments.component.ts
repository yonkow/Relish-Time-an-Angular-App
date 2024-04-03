import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { CommentRecipe } from 'src/app/types/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments: CommentRecipe[] = [];
  @ViewChild(NgForm, { static: true })
  form!: ElementRef<HTMLInputElement>;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipeService.fetchComments(this.recipeService.recipe!._id).subscribe({
      next: (comments) => {
        if (!comments) {
          throw new Error('There is no Comments!');
        }
        this.comments = comments;
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  comment(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const content = form.value.text;
    const recipeId = this.recipeService.recipe?._id;
    form.setValue({ text: '' });
    this.recipeService.addComment(content).subscribe({
      next: () => {
        this.ngOnInit();
        this.router.navigate([`recipes/${recipeId}`]);
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }
}
