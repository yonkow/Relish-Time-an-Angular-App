import { User } from "./user";

export interface Recipe {
    _id: string,
    name: string,
    level: string,
    mealType: string,
    time: number,
    ingredients: string[],
    image: string,
    description: string,
    calories: string,
    owner: User,
    likes: User[],
    comments: Comment[],
    createdAt: string;
    updatedAt: string;
}