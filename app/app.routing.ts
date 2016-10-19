/**
 * Created by NamitaMalik on 9/27/2016.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const APP_ROUTES:Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    {path: 'users', loadChildren: 'app/users/users.module#UsersModule'}
];
export const appRoutingProviders:any[] = [];
export const APP_ROUTING:ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);