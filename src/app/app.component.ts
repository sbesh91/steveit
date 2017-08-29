import 'rxjs/add/operator/takeUntil';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import './test-element.js';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  list: string[] = [];

  posts$: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {    
    this.posts$ = this.db.list("/posts");
    this.posts$
      .subscribe((data) => {
      console.log(data);
    });
  }

  push($event) {
    this.list.push($event.data);
    this.list = this.list.concat([]);
  }

  ngOnDestroy() {
    
  }
}
