import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // @Output() fetchLikedRecipes: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(NgForm, { static: true })
  form!: ElementRef<HTMLInputElement>;
  user: User | undefined;
  editMode: boolean = false;
  showLikedRecipes = false;

  constructor(private userService: UserService, private api: ApiService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error('Error: ', err.message);
      },
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  showCreatedRecipes() {
    this.showLikedRecipes = !this.showLikedRecipes;
    this.api.setFetchLikedRecipes(false);
  }

  updateProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const userData = form.value;
    this.userService.updateProfile(userData).subscribe({
      next: (user) => {
        this.user = user;
        this.ngOnInit();
        this.toggleEditMode();
      },
      error: (err) => {
        console.error('Error: ', err.message);
      },
    });
  }

  onFetchLikedRecipes() {
    this.showLikedRecipes = !this.showLikedRecipes;
    this.api.setFetchLikedRecipes(true);
  }
}
