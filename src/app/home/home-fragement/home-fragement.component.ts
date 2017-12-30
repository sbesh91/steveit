import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home-fragement',
  templateUrl: './home-fragement.component.html',
  styleUrls: ['./home-fragement.component.scss']
})
export class HomeFragementComponent implements OnInit {

  posts: Observable<Array<any>>;

  constructor(public fireStore: AngularFirestore) { }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.posts = this.fireStore.collection('posts').valueChanges();
  }
}
