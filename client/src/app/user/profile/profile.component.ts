import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  likedMode: boolean = false;

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) {}
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        // if (!user) {
        //   alert('You are not login! You will redirect to Login page...')
        //   this.cookieService.delete('auth-cookie')
        //   this.router.navigate(['auth/login'])
        // }
        console.log(user);
        
        this.user = user
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  getComments() {

  }
}
