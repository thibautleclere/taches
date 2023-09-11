import {FormControl} from "@angular/forms";

export interface ITasks {
  name: string;
  label?: string;
  description: string;
  underTasks?: IUnderTask[];
  status?: StatusEnum;
  project?: string;

  startDoing?: number;
  time?: number;
}

export enum StatusEnum {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
  PENDING = 'pending',
  DELETED = 'deleted'
}

export interface TaskForm {
  name: FormControl<string>;
  description: FormControl<string>;
  project: FormControl<string>;
}

export interface IUnderTaskForm {
    underTask: FormControl<string|null>;
}

export interface IUnderTask {
    description: string;
    locked: boolean;
}

export interface TimeInterface {
    secondes: number;
    minutes: number;
    heures: number;
}
