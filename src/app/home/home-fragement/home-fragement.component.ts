import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddPostFragmentComponent } from '../add-post-fragment/add-post-fragment.component';
import { Post } from '../../models/post';
import { PostType } from '../../models/post_type';
import { PaginationService } from '../../services/pagination.service';
import { QueryConfig } from '../../services/QueryConfig';
import { Vote } from '../../models/vote';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-home-fragement',
  templateUrl: './home-fragement.component.html',
  styleUrls: ['./home-fragement.component.scss']
})
export class HomeFragementComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  page = 0;
  pageSize = 20;

  types: Observable<Array<PostType>>;
  typesCollection: AngularFirestoreCollection<PostType>;

  addDialog: MatDialogRef<AddPostFragmentComponent>;

  constructor(
    public fireStore: AngularFirestore,
    public pagination: PaginationService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getPosts();
    this.getTypes();
  }

  private getTypes() {
    this.typesCollection = this.fireStore.collection<PostType>('types');
    this.types = this.typesCollection.valueChanges(['added', 'removed']);
  }

  private async getPosts() {
    this.pagination.init({
      path: 'posts',
      fields: [
        { field: 'PostDate', direction: 'desc' },
        { field: 'Score', direction: 'desc' },
      ],
      filters: [],
      limit: this.pageSize,
      prepend: false
    } as QueryConfig);

    this.postsCollection = this.fireStore.collection<Post>('posts');
  }

  private addPost(post: Post) {
    this.postsCollection.add(post);
  }

  private getPost(id: string): AngularFirestoreDocument<Post> {
    return this.postsCollection.doc<Post>(id);
  }

  private async updatePost(post: Post): Promise<void> {
    return await this.getPost(post.doc.id).update(post);
  }

  trackPostBy(post: Post) {
    if (!post || !post.doc) {
      return 0;
    }

    return post.doc.id;
  }

  openPost(post: Post) {
    this.getPost(post.doc.id);
  }

  vote(vote: Vote, post: Post) {
    // todo need to be able to look up the old vote to update it

  }

  nextPage() {
    this.pagination.more();
  }

  async openAddDialog() {
    this.addDialog = this.dialog.open(AddPostFragmentComponent, {
      minWidth: 300,
      disableClose: true,
      data: {
        types: this.types
      }
    });

    const $event = await this.addDialog.afterClosed().toPromise();
    if ($event) {
      this.addPost($event);
    }
  }

  closeAddDialog() {
    this.addDialog.close();
  }
}
