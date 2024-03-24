import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { samePasswordsValidator } from 'src/app/shared/validators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: [],
      },
      { validators: [samePasswordsValidator('password', 'rePassword')] }
    ),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  registerHandler() {
    if (this.form.invalid) {
      return;
    }
    const {
      username,
      email,
      passGroup: { password, rePassword } = {},
    } = this.form.value;

    this.userService
      .register(username!, email!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate([''])
      });
  }
}
