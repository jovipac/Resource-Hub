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
export class UserEntity {
    constructor(
        public id: string,
        public username: string,
        public name: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public created_at: string
    ) {}
}

export interface UserInterface {
    data?: (UserEntity)[] | null;
    meta: Meta;
}

export class Meta {
    pagination: Pagination;
}
export class Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
}
export class Links {
    next: string;
}
