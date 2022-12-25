import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITasks, StatusEnum, TaskForm} from '../interfaces';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.sass']
})
export class ModalsComponent {

  @Output() public addedTask: EventEmitter<ITasks> = new EventEmitter<ITasks>();

  public taskForm: FormGroup;
  public isActive: boolean = false;
  public error: string = '';
  public constructor(
  ) {
      this.taskForm = new FormGroup<TaskForm>(<TaskForm>{
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
      });
  }

  public createTask(): void {
    if (this.taskForm.valid) {
      const newTask: ITasks = {
        name: this.taskForm.value.name,
        label: this.taskForm.value.name?.replaceAll(' ', '-'),
        description: this.taskForm.value.description,
        status: StatusEnum.TODO
      };
      this.isActive = false;
      this.addedTask.emit(newTask);
      this.taskForm.reset();
    } else {
      this.error = "Le nom et la description sont obligatoires";
    }
  }

}
