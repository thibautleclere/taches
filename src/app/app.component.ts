import {Component, OnInit, ViewChild} from '@angular/core';
import {ITasks, StatusEnum} from './interfaces';
import {ModalsComponent} from './modals/modals.component';
import {DndDropEvent} from 'ngx-drag-drop';
import {TaskComponent} from './modals/task.component';
import {TaskService} from './services/task.service';
import {ReminderComponent} from "./modals/reminder.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    @ViewChild('modalTask') public modalTask: ModalsComponent = new ModalsComponent();
    @ViewChild('detailTask') public detailTask: TaskComponent = new TaskComponent();
    @ViewChild('reminder') public reminder: ReminderComponent = new ReminderComponent();
    public tasks: ITasks[] = [];
    public todos: ITasks[] = [];
    public doings: ITasks[] = [];
    public dones: ITasks[] = [];
    public pendings: ITasks[] = [];
    public projects: string[] = [];
    public expandedTodo: boolean = true;
    public expandedDoing: boolean = true;
    public expandedDone: boolean = true;
    public expandedPending: boolean = true;
    public desktopMode: boolean = false;
    public fileName: string = '';
    private classes: string[] = ['todo', 'doing', 'done', 'pending'];

    public constructor(
      private tasksService: TaskService
    ) {
    }

    public ngOnInit() {
        this.tasks = this.tasksService.getTasks();
        this.sortTasks();
    }

    public addTask() {
        this.modalTask.isActive = true;
        this.modalTask.projects = this.projects;
    }

    public openReminder() {
        this.reminder.isActive = true;
    }

    public onDragover(event: DragEvent): void {
        this.resetOverlap();
        const element = event.currentTarget as Element;
        if (this.classes.some((className: string) => element?.classList?.contains(className))) {
            element.classList.add('overlap');
        }
    }

    public onDrop(dropEvent: DndDropEvent): void {
        this.resetOverlap();
        const element = dropEvent.event.currentTarget as Element;
        const draggingTask: ITasks = dropEvent.data;
        const task = this.tasks.find((t) => t.label === draggingTask.label);
        const newStatus = this.classes.find((className: string) => element?.classList?.contains(className));
        if (newStatus && task) {
            task.status = newStatus as StatusEnum;
            this.setTimeToTask(newStatus as StatusEnum, task);
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
        this.detailTask.undertasks = task.underTasks || [];
        this.detailTask.isActive = true;
    }

    public saveTasks(openModal: boolean = false): void {
        this.tasksService.setTasks(this.tasks);
        this.detailTask.isActive = openModal;
    }

    public deleteTask(task: ITasks): void {
        this.tasks = this.tasks.filter((t) => t.label !== task.label);
        this.sortTasks();
        this.saveTasks();
    }

    public filterByProject(event: Event): void {
        const select: HTMLSelectElement = event.target as HTMLSelectElement;
        const project: string = select?.value || '';
        this.tasks = this.tasksService.getTasks(project);
        this.sortTasks();
    }

    public save(): void {
        this.tasksService.saveTasksOnFile();
    }

    public async loadTasks(event: Event): Promise<void> {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file: File| null = target.files.item(0);
            this.fileName = file?.name || '';
            const data: string = await file?.text() || '';
            this.tasks = JSON.parse(data);
            this.sortTasks();
        }
    }

    private sortTasks(): void {
        this.todos = this.tasks.filter((t) => t.status === StatusEnum.TODO);
        this.doings = this.tasks.filter((t) => t.status === StatusEnum.DOING);
        this.dones = this.tasks.filter((t) => t.status === StatusEnum.DONE);
        this.pendings = this.tasks.filter((t) => t.status === StatusEnum.PENDING);
        this.projects = this.tasksService.getProjects();
    }

    private resetOverlap(): void {
        const columns = document.getElementsByClassName('is-one-quarter');
        for (let columnKey in columns) {
            columns[columnKey].classList?.remove('overlap');
        }
    }

    private setTimeToTask(newStatus: StatusEnum, task : ITasks): void
    {
        task.status = newStatus;
        if (task.status === StatusEnum.DOING) {
            task.startDoing = (new Date()).getTime();
        } else if (task.startDoing) {
            task.time = (task.time || 0) + ((new Date()).getTime() - task.startDoing);
            task.startDoing = undefined;
        }
    }
}
