import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITasks, IUnderTask} from '../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
    @Input() public task: ITasks = {name:'', description: ''};
    @Output() public updateTask: EventEmitter<ITasks> = new EventEmitter<ITasks>();
    public isActive: boolean = false;
    public error: string = '';

    public undertasks: IUnderTask[] = [];

    public ngOnInit() {
    }
    public saveTask(): void {
        this.task.underTasks = this.undertasks;
        this.updateTask.emit(this.task);
    }

    public remove(index: number): void {
        this.undertasks = this.undertasks?.filter((val, key) => {
            return index !== key;
        });
    }

    public lockUndertask(index: number): void {
        const underTask = this.undertasks ? this.undertasks[index] : undefined;
        if (underTask) underTask.locked = !underTask.locked;
    }

    public handleChange(event: Event, index: number): void {
        const underTask = this.task.underTasks ? this.task.underTasks[index] : undefined;
    }

}
