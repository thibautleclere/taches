import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITasks, IUnderTaskForm, StatusEnum, TaskForm} from '../interfaces';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.sass']
})
export class ModalsComponent {

    @Output() public addedTask: EventEmitter<ITasks> = new EventEmitter<ITasks>();
    @Input() public projects: string[] = [];

    public taskForm: FormGroup;
    public isActive: boolean = false;
    public error: string = '';
    public constructor(
    ) {
        this.taskForm = new FormGroup<TaskForm>(<TaskForm>{
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            underTasks: new FormArray([]),
            project: new FormControl(''),
            existingProject: new FormControl('')
        });
    }

    public createTask(): void {
        if (this.taskForm.valid) {
            const newTask: ITasks = {
                name: this.taskForm.value.name,
                label: this.taskForm.value.name?.replaceAll(' ', '-'),
                description: this.taskForm.value.description,
                status: StatusEnum.TODO,
                project: this.taskForm.value.project || this.taskForm.value.existingProject || undefined,
                underTasks: this.taskForm.value.underTasks.map((ut: {underTask: string}) => {
                    return {'description': ut.underTask, 'locked': false};
                }) || []
            };
            this.isActive = false;
            this.addedTask.emit(newTask);
            this.taskForm.reset();
        } else {
            this.error = "Le nom et la description sont obligatoires";
        }
    }

    public addUnderTask(): void {
        this.underTasksFieldAsFormArray.push(this.underTask());
    }

    public remove(i: number): void {
        this.underTasksFieldAsFormArray.removeAt(i);
    }

    public get underTasksFieldAsFormArray(): FormArray {
        return this.taskForm.get('underTasks') as FormArray;
    }

    private underTask(): FormGroup {
        return new FormGroup<IUnderTaskForm>({
            underTask: new FormControl('')
        });
    }

}
