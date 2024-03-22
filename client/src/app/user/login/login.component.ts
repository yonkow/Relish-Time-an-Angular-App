import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild(
    NgForm,
    { static:true }
  )
    form!: ElementRef<HTMLInputElement>
    
  constructor(){}

  login(form: NgForm):void {
    
  }
}
