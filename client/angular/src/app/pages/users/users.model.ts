export interface Users {
    id: string;
    username: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    created_at: string;
}
export class UserModel {
    constructor(
        public id: string,
        public username: string,
        public name: string,
        public email: string,
        public created_at: string
    ) {}
}
