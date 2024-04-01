import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  errorMsg = '';

  constructor (private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.notificationService.apiErr$.subscribe((error: any) => {
      if (error && error.message) {
        this.errorMsg = error.message;
      } else {
        this.errorMsg = 'An error occurred';
      }
    });
  }
}
