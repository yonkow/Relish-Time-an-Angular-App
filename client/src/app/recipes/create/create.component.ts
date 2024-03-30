import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    level: ['', [Validators.required]],
    mealType: ['', [Validators.required]],
    time: [0, [Validators.required, Validators.min(5)]],
    ingredients: [[], Validators.required],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(3000),
      ],
    ],
    calories: [''],
    image: ['', [Validators.required]], // TODO: match /^https?:\/\//, message: 'URL should be in valid format http/https...'
  });

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
  ) {}

  createHandler() {
    if (this.form.invalid) {
      return;
    }

    const user = this.userService.user;

    const {
      name,
      level,
      mealType,
      time,
      ingredients,
      description,
      calories,
      image,
    } = this.form.value;

    this.recipeService
      .create(
        name!,
        level!,
        mealType!,
        time!,
        ingredients!,
        description!,
        calories!,
        image!,
        user as User
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
