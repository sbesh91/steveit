import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  list: string[] = [];

  posts$: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.posts$ = this.db.list('/posts');
    this.posts$.valueChanges().subscribe(console.log);
  }

  push($event) {
    console.log($event);
    this.list.push($event.data || $event.detail);
    this.list = this.list.concat([]);
  }
}
