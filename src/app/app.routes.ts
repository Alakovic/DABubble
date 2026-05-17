import { Routes } from '@angular/router';
import { Login } from './shared/login/login';
import { Register } from './shared/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'sign-in',
        component:Register 
    }
];
