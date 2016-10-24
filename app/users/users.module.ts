/**
 * Created by NamitaMalik on 9/28/2016.
 */
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {UsersComponent}    from './users.component';
import {UsersListComponent}  from './users-list.component';
import {UsersRoutingModule} from "./users-routing.module";

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        UsersListComponent
    ]
})
export class UsersModule {
}