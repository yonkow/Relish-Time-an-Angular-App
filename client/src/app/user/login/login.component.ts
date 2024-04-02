import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild(NgForm, { static: true })
  form!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;

    this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
