/**
 * Created by NamitaMalik on 9/28/2016.
 */

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent }    from './users.component';
import { UserListComponent }  from './user-list.component';

const usersRoutes: Routes  = [
    {
        path: '',
        component: UsersComponent,
        children : [
            {
                path:'',
                component:UserListComponent
            }
        ]
    }
];

export const usersRouting: ModuleWithProviders = RouterModule.forChild(usersRoutes);