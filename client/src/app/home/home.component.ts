import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.element.nativeElement
      .querySelectorAll('.nav-list li')
      .forEach((item: Element) => {
        item.classList.remove('active');
      });
  }
}
