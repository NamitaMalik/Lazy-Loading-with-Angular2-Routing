/**
 * Created by NamitaMalik on 9/27/2016.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing,
    appRoutingProviders }  from './app.routing';
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
    bootstrap: [ AppComponent ]})
export class AppModule { }
