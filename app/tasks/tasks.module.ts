/**
 * Created by NamitaMalik on 9/27/2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksComponent} from './tasks.component';
import {TaskDetailComponent} from './task-detail.component';
import {TasksListComponent} from './tasks-list.component';
import {TASKS_ROUTING} from "./tasks.routing";

@NgModule({
    imports: [
        CommonModule,
        TASKS_ROUTING
    ],
    declarations: [
        TasksComponent,
        TaskDetailComponent,
        TasksListComponent
    ]
})
export class TasksModule {
}