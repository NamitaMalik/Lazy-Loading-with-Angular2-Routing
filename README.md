# Lazy Loading with Angular2 Routing

With **Angular2** finally going live, I decided to dig into its **Router** and got know about one of its cool features i.e. **Lazy Loading of Modules**.
 If we go back to **Angular1.x** we know that there though we were defining **Controller** and **Template** for each route though the templates were getting
 lazy loaded, but js files weren't. But **Angular2** has provided a good solution to it. So let's not get into the `coding mode` without wasting much time.

 So we have this small app which has basically 3 modules:

 1. AppModule - This is the parent module of the application
 2. TasksModule - This is the child module of `AppModule`
 3. UsersModule - Child module of `AppModule`, sibling module of `TasksModule`

 Following are various components in which the application has been divided:

 1. AppComponent - This is the parent component of the application. Its the starting point in lay man's terms.
 2. TaskComponent - It is the parent component in the task module.
 3. TaskDetailComponent - This component is responsible for displaying details of the task.
 4. TaskListComponent - Component that displays list of tasks.
 5. UsersComponent - Container component for UserListComponent.
 6. UsersListComponent - Displays the list of users

Before we move on further, let's note that there are 3 other important parts of this app:

1. routing - This is the parent router for our application.
2. taskRouting - This is the child router. Takes care of routing for tasks module.
3. userRouting - Takes care of routing on users module.

Now let's see some code now:


