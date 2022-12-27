import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITasks} from '../interfaces';

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

    public ngOnInit() {}
    public saveTask(): void {
        this.updateTask.emit(this.task);
    }

}
