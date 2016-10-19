/**
 * Created by namita on 7/10/16.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TasksComponent}    from './tasks.component';
import {TaskDetailComponent}  from './task-detail.component';
import {TaskListComponent} from './task-list.component';

const TASKS_ROUTES:Routes = <any>[
    {
        path: 'tasks',
        component: TasksComponent,
        children: [
            {
                path: '',
                component: TaskListComponent
            },
            {
                path: ':id',
                component: TaskDetailComponent,
            }
        ]
    }
];

export const TASKS_ROUTING:ModuleWithProviders = RouterModule.forChild(TASKS_ROUTES);