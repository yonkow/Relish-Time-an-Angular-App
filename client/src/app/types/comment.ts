import { User } from "./user"

export interface Comment {
    text: string,
    author: User,
    likesComment: User[],
    createdAt: Date;
}