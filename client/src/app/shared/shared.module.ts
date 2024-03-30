import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';

@NgModule({
  declarations: [ElapsedTimePipe],
  imports: [CommonModule, RouterModule],
  exports: [ElapsedTimePipe],
})
export class SharedModule {}
