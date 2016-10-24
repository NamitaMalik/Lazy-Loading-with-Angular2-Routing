# Lazy Loading with Angular2 Routing

Let's dive into one of the cool features of **Angular2 Router** i.e. **Lazy Loading of Modules**.
If we go back to **Angular 1.x** we know that, there we were defining **Controller** and **Template** for each route, while templates were getting
lazy loaded, but js files weren't. But in **Angular2** it is possible to load your modules as and when they are required. So let's not get into the `coding mode`.

So we have this small app which has basically 3 modules:

1. AppModule - This is the root module of the application
2. TasksModule - This is the child module of `AppModule`
3. UsersModule - Child module of `AppModule`, sibling module of `TasksModule`

Following are various components in which the application has been divided:

1. AppComponent - This is the root component of the application.
2. TasksComponent - It is the parent component in the tasks module.
3. TaskDetailComponent - This component is responsible for displaying details of the task.
4. TasksListComponent - Component that displays list of tasks.
5. UsersComponent - It is the parent component in the users module and container component for UsersListComponent.
6. UsersListComponent - Displays the list of users

Before we move on further, let's note that there are 3 other important parts of this app:

1. ROUTING - This is the main router for our application.
2. TASKS_ROUTING - This is the child router. Takes care of routing for tasks module.
3. USERS_ROUTING - Takes care of routing for users module.

Now, let's see some code now:

```app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

> I am assuming that readers of this blog have some idea about Angular2 and its routing but would still try to give overview of few things.

In the above code you can see that we have imported **NgModule** and **BrowserModule**. We need `NgModule` decorator for defining module-level components, directives, pipes etc.
**BrowserModule** registers critical application service providers and also re-exports **CommonModule** from `@angular/common`.
We provide `AppComponent` in **declarations**, to tell **Angular** that  `AppComponent` belongs to `AppModule`. 
**bootstrap** is to advise **Angular** to bootstrap `AppComponent` into the **DOM** once `AppModule` starts.

Our `AppComponent` looks something like this:

```app.component.ts
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
     <nav>
        <a routerLink="/tasks">Tasks</a>
        <a routerLink="/users">Users</a>
      </nav>
      <router-outlet></router-outlet>
    `
})

export class AppComponent {
}
```

As you can see above, we have two anchor tags for navigation - one takes us to `tasks` page and another one takes us to `users` page. 
You can see `routerLink` property here which has a string path.

Let's see `TasksModule`:

```tasks.module.ts
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksComponent} from './tasks.component';
import {TaskDetailComponent} from './task-detail.component';
import {TasksListComponent} from './tasks-list.component';
import {TasksRoutingModule} from "./tasks-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TasksRoutingModule
    ],
    declarations: [
        TasksComponent,
        TaskDetailComponent,
        TasksListComponent
    ]
})
export class TasksModule {
}
```

We have imported **CommonModule** because it provides important directives such as **NgIf** and **NgFor**.
And here are the various components:

```tasks.component.ts
import {Component} from '@angular/core';

@Component({
    template: `
        <h2>Your Tasks</h2>
        <router-outlet></router-outlet>
    `,
})
export class TasksComponent {
}
```

```tasks-list.component.ts
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    template: `
    <div>
        <ul class="bubble">
            <li *ngFor="let task of tasks let i=index" (click)="onSelect(task)">
                <span>{{i+1}}.</span>
                <span>{{task.title}}</span>
            </li>
        </ul>
    </div>
    `,
})

export class TasksListComponent {

    constructor(private router:Router) {
    }

    private tasks = [
        {id: '1', title: 'Code Cleanup'}, 
        {id: '2', title: 'Review Code'}, 
        {id: '3', title: 'Build to Prod'}
    ];
    private errorMessage:any = '';

    onSelect(task) {
        this.router.navigate(['/tasks', task.id]);
    }
}
```

In order to keep the demo as simple as possible, we have a small hard-coded list of tasks. We are displaying a list of tasks 
and on clicking on each task, user would be navigated to `task-detail` page where details of a task would be displayed.

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

And here is the`TasksRoutingModule` which has route configuration for our`tasks` module:

```tasks-routing.module.ts
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {TasksComponent}    from './tasks.component';
import {TaskDetailComponent}  from './task-detail.component';
import {TasksListComponent} from './tasks-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
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
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class TasksRoutingModule {
}
```

So when a user lands to the application, by default `tasks` module would be displayed to him. So when the path would be simply `/tasks`, user would see list of tasks and once
user clicks on a particular task, id  would be added as the **routeParam** and route would change to '/tasks/id'(id of that particular task).

Now, let's quickly have a look at the `users` module.

```users.module.ts
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
```

and here is the `UsersComponent` which is the parent component for `UsersList`. Here are both the components:

```users.component.ts
import {Component} from '@angular/core';

@Component({
    template: `
    <h2>Users List</h2>
    <router-outlet></router-outlet>
  `,
})
export class UsersComponent {
}
```


```users-list.component.ts
import {Component} from '@angular/core';

@Component({
    template: `
    <div>
        <ul class="bubble">
            <li *ngFor="let user of users let i=index">
                <span>{{i+1}}.</span>
                <span>{{user.name}}</span>
            </li>
        </ul>
    </div>
    `,
})

export class UsersListComponent {
    private users = [
        {id: '1', name: 'John Doe'},
        {id: '2', name: 'Jane Roe'},
        {id: '3', name: 'John Smith'}
    ];
}
```

and here is the routing for `Users` module:

```users.routing.ts
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersComponent}    from './users.component';
import {UsersListComponent}  from './users-list.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UsersComponent,
                children: [
                    {
                        path: '',
                        component: UsersListComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class UsersRoutingModule {
}
```

Let's quickly move onto the place where all the magic happens i.e. `AppRoutingModule`:

```app-routing.module.ts
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', redirectTo: '/tasks', pathMatch: 'full'},
            {path: 'tasks', loadChildren: 'app/tasks/tasks.module#TasksModule'},
            {path: 'users', loadChildren: 'app/users/users.module#UsersModule'}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
```

Well, as you can see in the above code, since by default we are redirecting our page to `tasks` so our tasks module would get loaded. When the route changes to '/users', the routes module would be loaded. This has been achieved
using the `loadChildren` property defined on the route. **Angular** will fetch the module at the location and then load the routes defined in its router config. 
The path to the file and name of the module is separated by `#`. The **Router** reads the `ModuleName` given after `#` and loads the module accordingly. 
So we did not load `UsersModule` and `TasksModule` in our `AppComponent`, instead used `loadChildren` property in the routing config to lazy load our modules.

Here is the quick view of what is happening:

![view.gif](https://raw.githubusercontent.com/NamitaMalik/Lazy-Loading-with-Angular2-Routing/master/assets/view.gif)

You can see tasks module gets loaded only when we click on the Tasks link. Similarly, users module also gets when we click on the Users link.

Well that's all for now, though **lazy loading** is an advantage of **Angular Router**, it has a disadvantage too i.e. there would be some waiting every time when a new module is being loaded. This issue can be resolved using **preloading** of modules which
I'll be discussing in my upcoming blog..till then Happy Learning!

Follow Me
---
[Github](https://github.com/NamitaMalik)

[Twitter](https://twitter.com/namita13_04)

[LinkedIn](https://in.linkedin.com/in/namita-malik-a7885b23)

[More Blogs By Me](https://namitamalik.github.io/)