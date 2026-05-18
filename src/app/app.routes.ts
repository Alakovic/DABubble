import { Routes } from '@angular/router';
import { Login } from './shared/login/login';
import { Register } from './shared/register/register';
import { SendEmail } from './shared/send-email/send-email';

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
    }
];
