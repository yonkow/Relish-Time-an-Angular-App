import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('notifyAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ transform: 'scale(0)' }), animate(300)]),
      transition('* => void', [animate(300, style({ transform: 'scale(0)' }))]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  errorMsg = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.apiErr$.subscribe(
      (error: HttpErrorResponse | null) => {
        if (error && error.message) {
          this.errorMsg = error.error.message;
          setTimeout(() => {
            this.errorMsg = '';
          }, 3000);
        }
      }
    );
  }
}
