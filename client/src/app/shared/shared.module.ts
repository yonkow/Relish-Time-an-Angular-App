import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { FormsModule } from '@angular/forms';
import { RecipeBoxComponent } from './recipe-box/recipe-box.component';
import { CommentsComponent } from './comments/comments.component';
import { SlicePipe } from './pipes/slice.pipe';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [ElapsedTimePipe, RecipeBoxComponent, CommentsComponent, SlicePipe, WelcomeComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [ElapsedTimePipe, RecipeBoxComponent, CommentsComponent, SlicePipe, WelcomeComponent],
})
export class SharedModule {}
