import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { samePasswordsValidator } from 'src/app/shared/validators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    pass: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: [],
      },
      { validators: [samePasswordsValidator('password', 'rePassword')] }
    ),
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  registerHandler() {
    if (this.form.invalid) {
      return;
    }
    const formData = {"username": this.form.value['username'], "email": this.form.value['email'], "password": this.form.value['pass']?.password}

    this.userService.testRegisterData(formData);
  }
}
