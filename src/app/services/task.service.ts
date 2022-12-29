import { Injectable } from '@angular/core';
import { ITasks } from '../interfaces';
import * as fileSaver from 'file-saver';

@Injectable()
export class TaskService {

    public getTasks(project?: string): ITasks[] {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (project?.length) {
            return tasks.filter((t: ITasks) => t.project === project);
        }
        return tasks;
    }

    public setTasks(tasks: ITasks[]): void {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    public getProjects(): string[] {
        return [...new Set(this.getTasks().map((t) => t.project || '').filter((p) => !!p))];
    }

    public saveTasksOnFile(): void {
        const sTasks: string = JSON.stringify(this.getTasks());
        const blob = new Blob([sTasks], {type: 'application/json'});
        fileSaver.saveAs(blob, this.getToday());
    }

    private getToday(): string {
        const today: Date = new Date();
        return today.getDay().toString().padStart(2, '0')
          +today.getMonth().toString().padStart(2, '0')
          +today.getFullYear();
    }

}
