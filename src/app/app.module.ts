import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ModalsComponent } from './modals/modals.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { TaskComponent } from './modals/task.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalsComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DndModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
