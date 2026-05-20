import { UserInterface } from '../interfaces/user-interface';

export class User implements UserInterface {
    id: string;
    name: string;
    email: string;
    avatar:string;
    
    constructor(data?: Partial<UserInterface>) {
        this.id = data?.id ?? '';
        this.name = data?.name ?? '';
        this.email = data?.email ?? '';
        this.avatar = data?.avatar ?? '';
    }

    toJSON() {
        return {
            name: this.name,
            email: this.email,
            avatar: this.avatar
        };
    }

}