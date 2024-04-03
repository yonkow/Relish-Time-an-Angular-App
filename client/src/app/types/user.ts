import { Recipe } from './recipe';

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdRecipes: Recipe[];
  likedRecipes: Recipe[];
  commentedRecipes: Recipe[];
  createdAt: string;
  updatedAt: string;
}
