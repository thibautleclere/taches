import { Component } from '@angular/core';
import * as fileSaver from "file-saver";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.sass']
})
export class ReminderComponent {
    public isActive: boolean = false;
    public text: string = '';
    public error: string = '';

    public saveReminder(): void {
        const blob = new Blob([this.text], {type: 'text/plain'});
        fileSaver.saveAs(blob, 'pensebete');
        this.isActive = false;
    }
}
