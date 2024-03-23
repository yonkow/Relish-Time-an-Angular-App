import { User } from "./user";

export interface Recipe {
    name: string,
    level: string,
    mealType: string,
    prepTime: number,
    ingredients: string[],
    img: string,
    description: string,
    calories: string,
    owner: User,
    likes: User[],
    comments: Comment[],
    createdAt: Date;
    updatedAt: Date;
}