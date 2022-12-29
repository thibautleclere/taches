import { Injectable } from '@angular/core';
import { ITasks } from '../interfaces';

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

}
