import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{
  constructor(private renderer: Renderer2, private element: ElementRef) {}


  isActive: boolean = false;

  activeToggle(e: Event): void {
    this.element.nativeElement
      .querySelectorAll('.nav-list li')
      .forEach((item: Element) => {
        item.classList.remove('active');
      });
    const target = e.currentTarget as HTMLElement;
    
    target.classList.add('active');

    this.isActive = !this.isActive;
  }
}
