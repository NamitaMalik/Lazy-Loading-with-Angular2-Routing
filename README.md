# Lazy Loading with Angular2 Routing

With **Angular2** finally going live, I decided to dig into its **Router** and got know about one of its cool features i.e. **Lazy Loading of Modules**.
 If we go back to **Angular1.x** we know that there though we were defining **Controller** and **Template** for each route though the templates were getting
 lazy loaded, but js files weren't. But **Angular2** has provided a good solution to it. So let's not get into the `coding mode` without wasting much time.

 So we have this small app which has basically 3 modules:

 1. AppModule - This is the parent module of the application
 2. TasksModule - This is the child module of `AppModule`
 3. UsersModule - Child module of `AppModule`, sibling module of `TasksModule`

 And here are the various components in which the application has been divided:

