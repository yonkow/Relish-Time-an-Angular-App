import { Component, ErrorHandler, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { ErrorNotification, ErrorObserver } from 'rxjs';
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
    this.notificationService.apiErr$.subscribe((err: HttpErrorResponse | null ) => {
      this.errorMsg = err?.message || ''  
    })
  }
}
