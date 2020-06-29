import { User } from './User';
export interface Post{
    postId: number;
    status: String;
    privacy: String;
    location: String;
    pinned: boolean;
    timestamp: number;
    user: User;

}