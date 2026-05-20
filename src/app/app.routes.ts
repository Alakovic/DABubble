import { Routes } from '@angular/router';
import { Login } from './shared/login/login';
import { Register } from './shared/register/register';
import { SendEmail } from './shared/send-email/send-email';
import { Avatar } from './shared/avatar/avatar';
import { Workspace } from './shared/workspace/workspace';
import { NewPassword } from './shared/new-password/new-password';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'sign-in',
        component:Register 
    },
    {
        path: 'send-email',
        component:SendEmail
    },
    {
        path: 'select-avatar',
        component: Avatar
    },
    {
        path: 'workspace',
        component: Workspace
    },
    {
        path: 'new-password',
        component: NewPassword
    }
];
