import 'rxjs/add/operator/takeUntil';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import '@polymer/iron-list/iron-list.js';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import './test-element.js';

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
    this.posts$ = this.db.list("/posts");
    this.posts$.valueChanges().subscribe(console.log);
  }

  @HostListener('custom-add',['$event'])
  push($event) {
    console.log($event);
    this.list.push($event.data || $event.detail);
    this.list = this.list.concat([]);
  }
}
