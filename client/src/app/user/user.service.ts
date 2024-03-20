import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerData: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  testRegisterData(formData: any) {
    const { apiUrl } = environment;

    let url = `${apiUrl}/users/register`;
    return this.http
      .post<object>(url, formData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['']);
        }
      });
  }
}
