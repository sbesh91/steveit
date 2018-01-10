import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddPostFragmentComponent } from '../add-post-fragment/add-post-fragment.component';
import { Post } from '../../models/post';
import { PostType } from '../../models/post_type';
import { PaginationService } from '../../services/pagination.service';
import { QueryConfig } from '../../services/QueryConfig';

@Component({
  selector: 'app-home-fragement',
  templateUrl: './home-fragement.component.html',
  styleUrls: ['./home-fragement.component.scss']
})
export class HomeFragementComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  page = 0;
  pageSize = 1;

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
    this.types = this.typesCollection.valueChanges();
  }

  private async getPosts() {
    this.pagination.init('posts', 'PostDate', {
      limit: this.pageSize,
      reverse: true,
      prepend: false
    } as QueryConfig);

    this.postsCollection = this.fireStore.collection<Post>('posts');
  }

  private addPost(post: Post) {
    this.postsCollection.add({
      Label: post.Label,
      Url: post.Url,
      Body: post.Body,
      Type: post.Type,
      PostDate: post.PostDate,
      Score: post.Score,
      Votes: post.Votes,
      Comments: []
    } as Post);
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
