import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITasks, StatusEnum } from '../interfaces';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.sass']
})
export class CardTaskComponent implements OnInit {

    @Input() public task: ITasks = {name: '', description: ''};
    @Output() public displayTask: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public deleteTask: EventEmitter<boolean> = new EventEmitter<boolean>();
    public status: string = '';
    public time: string = '';

    private classes: {status: StatusEnum, label: string}[] = [
        {status: StatusEnum.TODO, label:'todo'},
        {status: StatusEnum.DOING, label:'doing'},
        {status: StatusEnum.DONE, label:'done'},
        {status: StatusEnum.PENDING, label:'pending'},
    ];

    public constructor(
        private taskService: TaskService
    ) {
    }

    public ngOnInit() {
        const classe = this.classes.find((c) => c.status === this.task.status);
        this.status = classe?.label || '';
        this.time = this.getOperationTime();
    }

    public showTask(): void
    {
        this.displayTask.emit(true);
    }

    public delete(): void
    {
        this.deleteTask.emit(true);
    }

    private getOperationTime(): string
    {
        const opTime = this.taskService.operationTime(this.task.time || 0);
        let time = ``;
        if (opTime.heures > 0) {
            time += `${opTime.heures} h`;
        }
        if (opTime.minutes > 0) {
            time += `${opTime.minutes} m`;
        }
        time += `${opTime.secondes} s`;
        return time;
    }
}
