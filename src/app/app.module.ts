import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ModalsComponent } from './modals/modals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { TaskComponent } from './modals/task.component';
import { TaskService} from './services/task.service';
import { ReminderComponent } from './modals/reminder.component';
import { CardTaskComponent } from './card-task/card-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalsComponent,
    TaskComponent,
    ReminderComponent,
    CardTaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DndModule,
    FormsModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
