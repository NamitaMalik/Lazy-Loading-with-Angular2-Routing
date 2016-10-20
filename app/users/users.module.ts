/**
 * Created by NamitaMalik on 9/28/2016.
 */
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {UsersComponent}    from './users.component';
import {UsersListComponent}  from './users-list.component';
import {USERS_ROUTING} from "./users.routing";

@NgModule({
    imports: [
        CommonModule,
        USERS_ROUTING
    ],
    declarations: [
        UsersComponent,
        UsersListComponent
    ]
})
export class UsersModule {
}