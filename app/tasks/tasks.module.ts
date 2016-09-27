/**
 * Created by NamitaMalik on 9/27/2016.
 */

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { TasksComponent }    from './tasks.component';
import { TaskDetailComponent }  from './task-detail.component';
import {TaskListComponent} from './task-list.component';
import {tasksRouting} from "./tasks.routing";
@NgModule({
    imports: [
        CommonModule,
        tasksRouting
    ],
    declarations: [
        TasksComponent,
        TaskDetailComponent,
        TaskListComponent
    ]
})
export class TasksModule {}