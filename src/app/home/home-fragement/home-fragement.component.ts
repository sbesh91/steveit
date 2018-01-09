import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddPostFragmentComponent } from '../add-post-fragment/add-post-fragment.component';
import { Post } from '../../models/post';
import { PostType } from '../../models/post_type';

@Component({
  selector: 'app-home-fragement',
  templateUrl: './home-fragement.component.html',
  styleUrls: ['./home-fragement.component.scss']
})
export class HomeFragementComponent implements OnInit {

  posts: Observable<Array<Post>>;
  postsCollection: AngularFirestoreCollection<Post>;

  types: Observable<Array<PostType>>;
  typesCollection: AngularFirestoreCollection<PostType>;
  addDialog: MatDialogRef<AddPostFragmentComponent>;

  constructor(
    public fireStore: AngularFirestore,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getPosts();
    this.getTypes();
  }

  private getTypes() {
    this.typesCollection = this.fireStore.collection<PostType>('types');
    this.types = this.typesCollection.valueChanges();
  }

  private getPosts() {
    this.postsCollection = this.fireStore.collection<Post>('posts');
    this.posts = this.postsCollection.valueChanges();
  }

  addPost(post: Post) {
    this.postsCollection.add(post);
  }

  async openAddDialog() {
    this.addDialog = this.dialog.open(AddPostFragmentComponent, {
      minWidth: 300,
      data: {
        types: this.types
      }
     });

    const closed = await this.addDialog.afterClosed().toPromise();
    console.log(closed);
  }

  closeAddDialog() {
    this.addDialog.close();
  }
}
