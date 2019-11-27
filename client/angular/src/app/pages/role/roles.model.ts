export interface Roles {
    id: string;
    name: string;
    created_at: string;
    update_at: string;
}
export class RoleEntity {
    constructor(public id: string, public name: string) {}
}
