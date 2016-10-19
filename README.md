# Lazy Loading with Angular2 Routing

###This paragraph should be more readable - Start
With **Angular2** finally going live, I decided to dig into its **Router** and got know about one of its cool features i.e. **Lazy Loading of Modules**.
If we go back to **Angular1.x** we know that there though we were defining **Controller** and **Template** for each route though the templates were getting
lazy loaded, but js files weren't. But **Angular2** has provided a good solution to it. So let's not get into the `coding mode` without wasting much time.
###This paragraph should be more readable - END

So we have this small app which has basically 3 modules:

1. AppModule - This is the parent module of the application
2. TasksModule - This is the child module of `AppModule`
3. UsersModule - Child module of `AppModule`, sibling module of `TasksModule`

Following are various components in which the application has been divided:

1. AppComponent - This is the parent component of the application. Its the starting point in lay man's terms.
2. TasksComponent - It is the parent component in the task module.
3. TaskDetailComponent - This component is responsible for displaying details of the task.
4. TasksListComponent - Component that displays list of tasks.
5. UsersComponent - Container component for UserListComponent.
6. UsersListComponent - Displays the list of users

Before we move on further, let's note that there are 3 other important parts of this app:

1. ROUTING - This is the parent router for our application.
2. TASKS_ROUTING - This is the child router. Takes care of routing for tasks module.
3. USERS_ROUTING - Takes care of routing on users module.

Now, let's see some code now:

```app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {TasksModule} from './tasks/tasks.module';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        TasksModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

> I am assuming that readers of this blog have some idea about Angular2 and its routing but would still try to give overview of few things.

In the above code you can see that we have imported **NgModule** and **BrowserModule**. We need `NgModule` decorator for defining module-level components, directives, pipes etc.
**BrowserModule** includes directives such as **NgIf** and **NgFor** and also registers critical application service providers.
We provide `AppComponent` in **declarations**, to tell **Angular** that  `AppComponent` belongs to `AppModule`. 
**bootstrap** is to advise **Angular** to bootstrap `AppComponent` into the **DOM** once **AppModule** starts up.

> I hope you have noticed that we have only imported **TasksModule** but haven't imported the `UsersMoule`..well, that is what we intend to do here. Lazy load the modules
as and when they are required. In this application, a user would land to task list page where he would see list of tasks. Hence we have imported the TasksModule here.

Our `AppComponent` looks something like this:

```app.component.ts
import {Component} from '@angular/core';
@Component({
    selector: 'my-app',
    template: `
     <nav>
        <a  routerLink="/tasks">Tasks</a>
        <a  routerLink="/users">Users</a>
      </nav>
      <router-outlet></router-outlet>
    `
})
export class AppComponent {
}
```

As you can see above, we have to anchor tags for navigation - one takes us to `tasks` page and another one takes us to `users` page. You can see `routerLink` property here which has a string path.

Let's see `TasksModule`:

```tasks.module.ts
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { TasksComponent }    from './tasks.component';
import { TaskDetailComponent }  from './task-detail.component';
import {TaskListComponent} from './task-list.component';
import {taskRouting} from "./tasks.routing";
@NgModule({
    imports: [
        CommonModule,
        taskRouting
    ],
    declarations: [
        TasksComponent,
        TaskDetailComponent,
        TaskListComponent
    ]
})
export class TasksModule {}
```

And here are the various components:

```tasks.component.ts
import { Component } from '@angular/core';
@Component({
    template:  `
    <h2>Your Tasks</h2>
    <router-outlet></router-outlet>
  `,
})
export class TasksComponent { }
```

```task-list.component.ts
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    template: `
    <div>
        <ul class="bubble">
        <li *ngFor="let task of tasks let i=index" (click)="onSelect(task)">
        <span>{{i+1}}.</span>
        <span>{{task.title}}</span></li>
        </ul>
    </div>
    `,
})
export class TaskListComponent {

    constructor(private router: Router) {
    }

    private tasks = [{id: '1', title: 'Code Cleanup'}, {id: '2', title: 'Review Code'}, {
        id: '3',
        title: 'Build to Prod'
    }];
    private errorMessage: any = '';

    onSelect(task) {
        this.router.navigate(['/tasks', task.id]);
    }
}
```

In order to keep the demo as simple as possible, we have a small hard-coded list of tasks. We are displaying a list of tasks and on clicking on each task, user would be navigated to `taskdetail` page where details of a task would be displayed.

```task-detail.component.ts
import {Component} from '@angular/core';

@Component({
    template: `
    <div>
        <span>Some task detail to show up here.</span>
    </div>
    `
})

export class TaskDetailComponent {

}
```

And here is the route configuration for our`tasks` module:

```tasks.routing.ts
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent }    from './tasks.component';
import { TaskDetailComponent }  from './task-detail.component';
import {TaskListComponent} from './task-list.component';

const taskRoutes: Routes  = [
    {
        path: 'tasks',
        component: TasksComponent,
        children : [
            {
                path:'',
                component:TaskListComponent
            },
            {
                path:':id',
                component: TaskDetailComponent,
            }
        ]
    }
];

export const taskRouting: ModuleWithProviders = RouterModule.forChild(taskRoutes);
```

So when a user lands to the application, by default `tasks` module would be displayed to him. So when the path would be simply `/tasks`, user would see list of tasks and once
user clicks on a particular task, id  would be added as the **routeParam** and route would change to '/tasks/id'(id of that particular task).

Now, let's quickly have a look at the `users` module.

```users.module.ts
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { UsersComponent }    from './users.component';
import { UserListComponent }  from './user-list.component';
import {usersRouting} from "./users.routes";
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
export class UsersModule {}
```

and here is the `UsersComponent` which is the parent component for `UsersList`. Here are both the components:

```users.component.ts
import { Component } from '@angular/core';
@Component({
    template:  `
    <h2>Users List</h2>
    <router-outlet></router-outlet>
  `,
})
export class UsersComponent { }
```


```user-list.component.ts
import {Component} from '@angular/core';

@Component({
    template: `
    <div>
        <ul class="bubble">
        <li *ngFor="let user of users let i=index">
        <span>{{i+1}}.</span>
        <span>{{user.name}}</span></li>
        </ul>
    </div>
    `,
})

export class UserListComponent {

    private users = [{id: '1', name: 'John Doe'}, {id: '2', name: 'Jane Roe'}, {
        id: '3',
        name: 'John Smith'
    }];
}
```

and here is the routing for `Users` module:

```users.routing.ts
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
```

Let's quickly move onto the place where all the magic happens i.e. `app.routing.ts`:

```app.routing.ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
    },
    { path: 'users', loadChildren: 'app/users/users.module#UsersModule' }
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

Well, as you can see in the above code, by default our tasks module would get loaded. When the route changes to '/users', the routes module would be loaded. This has been achieved
using the `loadChildren` property defined on the route. Angular will fetch the module at the location and then load the routes defined in its
router config. So we did not load `UsersModule` in our `AppComponent`, instead used `loadChildren` property in the routing config.

Here is the quick view of what is happening:



You can see tasks module gets loaded initially whereas the users module gets loaded only when we click on the Users tab.

I'll be back again with a new post soon, till then Happy Learning!

Follow Me
---
[Github](https://github.com/NamitaMalik)

[Twitter](https://twitter.com/namita13_04)

[LinkedIn](https://in.linkedin.com/in/namita-malik-a7885b23)

[More Blogs By Me](https://namitamalik.github.io/)
