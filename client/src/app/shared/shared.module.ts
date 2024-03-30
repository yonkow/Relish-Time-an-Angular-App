import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ElapsedTimePipe],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [ElapsedTimePipe],
})
export class SharedModule {}
