import {Injectable} from '@angular/core';
import {ITasks, StatusEnum} from '../interfaces';
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
        const tasks = this.getTasks();
        const sTasks: string = JSON.stringify(tasks);
        const blob = new Blob([sTasks], {type: 'application/json'});
        fileSaver.saveAs(blob, `json${this.getToday()}`);
        const text: string = this.buildFile(tasks);
        const blobT = new Blob([text], {type: 'text/plain'});
        fileSaver.saveAs(blobT, this.getToday());
    }

    private getToday(): string {
        const today: Date = new Date();
        return today.getDay().toString().padStart(2, '0')
          +today.getMonth().toString().padStart(2, '0')
          +today.getFullYear();
    }

    private buildFile(tasks: ITasks[]): string {
        let s: string = `Taches à faire\n\n\n`;
        s += this.buildTasksStatus(tasks, StatusEnum.TODO);
        s += `\n\nTaches en cours\n\n\n`;
        s += this.buildTasksStatus(tasks, StatusEnum.DOING);
        s += `\n\nTaches terminées\n\n\n`;
        s += this.buildTasksStatus(tasks, StatusEnum.DONE);
        s += `\n\nTaches en attente\n\n\n`;
        s += this.buildTasksStatus(tasks, StatusEnum.PENDING);
        return s;
    }

    private buildTasksStatus(tasks: ITasks[], status: StatusEnum): string {
      let sText: string = '';
        tasks.filter((t) => t.status === status).forEach((t) => {
          sText += `${t.label}\n\t${t.description}`;
        });
        return sText;
    }

}
