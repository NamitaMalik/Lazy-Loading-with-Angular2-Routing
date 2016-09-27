/**
 * Created by NamitaMalik on 9/27/2016.
 */

import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    template: `
    <div>
        <ul class="items">
        <li *ngFor="let task of tasks" (click)="onSelect(task)">
        <span>{{task.title}}</span></li>
        </ul>
    </div>
    `,
})

export class TaskListComponent {

    constructor(private router: Router) {
    }

    private tasks =[{id:'1',title:'Requirement Gathering'}, {id:'2',title:'Requirement Analysis'}];
    private errorMessage:any='';

    onSelect(task){
        this.router.navigate(['/tasks',task.id]);
    }
}