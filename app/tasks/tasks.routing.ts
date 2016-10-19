/**
 * Created by namita on 7/10/16.
 */

import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TasksComponent}    from './tasks.component';
import {TaskDetailComponent}  from './task-detail.component';
import {TasksListComponent} from './tasks-list.component';

const TASKS_ROUTES:Routes = <any>[
    {
        path: 'tasks',
        component: TasksComponent,
        children: [
            {
                path: '',
                component: TasksListComponent
            },
            {
                path: ':id',
                component: TaskDetailComponent,
            }
        ]
    }
];

export const TASKS_ROUTING:ModuleWithProviders = RouterModule.forChild(TASKS_ROUTES);