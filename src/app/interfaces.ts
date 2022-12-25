import {FormControl} from "@angular/forms";

export interface ITasks {
  name: string;
  label?: string;
  description: string;
  status?: StatusEnum;
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
}
