import { User } from "./user";

export type AuthResponse = {
    access_token: string;
    user: User
}