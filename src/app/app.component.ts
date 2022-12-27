import { Component, OnInit, ViewChild } from '@angular/core';
import { ITasks, StatusEnum } from './interfaces';
import { ModalsComponent } from './modals/modals.component';
import { DndDropEvent } from 'ngx-drag-drop';
import {TaskComponent} from "./modals/task.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    @ViewChild('modalTask') public modalTask: ModalsComponent = new ModalsComponent();
    @ViewChild('detailTask') public detailTask: TaskComponent = new TaskComponent();
    public tasks: ITasks[] = [];
    public todos: ITasks[] = [];
    public doings: ITasks[] = [];
    public dones: ITasks[] = [];
    public pendings: ITasks[] = [];
    private classes: string[] = ['todo', 'doing', 'done', 'pending'];

    public ngOnInit() {
        const tasks = localStorage.getItem('tasks') || '[]';
        this.tasks = JSON.parse(tasks);
        this.sortTasks();
    }

    public addTask() {
        this.modalTask.isActive = true;
    }

    public onDragover(event: DragEvent): void {
        const columns = document.getElementsByClassName('is-one-quarter');
        for (let columnKey in columns) {
            columns[columnKey].classList?.remove('overlap');
        }
        const element = event.currentTarget as Element;
        if (this.classes.some((className: string) => element?.classList?.contains(className))) {
            element.classList.add('overlap');
        }
    }

    public onDrop(dropEvent: DndDropEvent): void {
        const element = dropEvent.event.currentTarget as Element;
        const draggingTask: ITasks = dropEvent.data;
        const task = this.tasks.find((t) => t.label === draggingTask.label);
        const newStatus = this.classes.find((className: string) => element?.classList?.contains(className));
        if (newStatus && task) {
            task.status = newStatus as StatusEnum;
            this.sortTasks();
            this.saveTasks();
        }
    }

    public handleNewTasks(task: ITasks): void {
        this.tasks.push(task);
        this.sortTasks();
        this.saveTasks();
    }

    public showTask(task: ITasks): void {
        this.detailTask.task = task;
        this.detailTask.isActive = true;
    }

    public saveTasks(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.detailTask.isActive = false;
    }

    public deleteTask(task: ITasks, event: Event): void {
        event.stopPropagation();
        this.tasks = this.tasks.filter((t) => t.label !== task.label);
        this.sortTasks();
        this.saveTasks();
    }

    private sortTasks(): void {
        this.todos = this.tasks.filter((t) => t.status === StatusEnum.TODO);
        this.doings = this.tasks.filter((t) => t.status === StatusEnum.DOING);
        this.dones = this.tasks.filter((t) => t.status === StatusEnum.DONE);
        this.pendings = this.tasks.filter((t) => t.status === StatusEnum.PENDING);
    }
}
