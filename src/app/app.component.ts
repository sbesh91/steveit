import 'rxjs/add/operator/takeUntil';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import '@polymer/iron-list/iron-list.js';
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

  @HostListener('custom-add',['$event'])
  push($event) {
    console.log($event);
    this.list.push($event.data || $event.detail);
    this.list = this.list.concat([]);
  }
}
