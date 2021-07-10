import { Component, Input } from '@angular/core';

@Component({
  selector: 'stream-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

    @Input()
    stream: any = {};

    isEmpty() {
        const { stream, error, pending } = this.stream;
        if (error || pending) {
            return false;
        }
        if (stream && stream.length > 0) {
            return false;
        }
        return true;
    }
}
