import { Time } from '@angular/common';

export interface Post{
    id: number;
    status: String;
    privacy: String;
    location: string;
    pinned: boolean;
    timestamp: number;
    userid: number;

}