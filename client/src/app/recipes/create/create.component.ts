import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    level: ['', [Validators.required]],
    mealType: ['', [Validators.required]],
    time: [0, [Validators.required, Validators.min(5)]],
    ingredients: [[]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    calories: [''],
    image: ['', [Validators.required, ]] // TODO: match /^https?:\/\//, message: 'URL should be in valid format http/https...'
  })

  constructor(private fb: FormBuilder) {}

  createHandler() {
    if (this.form.invalid) {
      return;
    }

    console.log('done');
    
    // const {
    //   username,
    //   email,
    //   passGroup: { password, rePassword } = {},
    // } = this.form.value;

    // this.userService
    //   .register(username!, email!, password!, rePassword!)
    //   .subscribe(() => {
    //     this.router.navigate([''])
    //   });
  }
}
