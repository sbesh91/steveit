import { Component } from '@angular/core';
import './test-element.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  list: string[] = [];

  push($event) {
    this.list.push($event.data);
    this.list = this.list.concat([]);
  }
}
