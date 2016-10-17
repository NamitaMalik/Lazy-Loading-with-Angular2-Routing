/**
 * Created by NamitaMalik on 9/28/2016.
 */
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {UsersComponent}    from './users.component';
import {UserListComponent}  from './user-list.component';
import {usersRouting} from "./users.routing";

@NgModule({
    imports: [
        CommonModule,
        usersRouting
    ],
    declarations: [
        UsersComponent,
        UserListComponent
    ]
})
export class UsersModule {
}