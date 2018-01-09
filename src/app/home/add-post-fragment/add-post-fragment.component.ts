import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PostType } from '../../models/post_type';
import { Post } from '../../models/post';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-post-fragment',
  templateUrl: './add-post-fragment.component.html',
  styleUrls: ['./add-post-fragment.component.scss']
})
export class AddPostFragmentComponent implements OnInit {

  types: Observable<Array<PostType>>;

  post: Post = new Post();

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddPostFragmentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.post = new Post();
    this.types = this.data.types;

    this.form = this.fb.group({
      'label': ['', [Validators.required]],
      'link': ['', [Validators.required]],
      'body': ['', [Validators.required]],
      'type': ['', [Validators.required]]
    });
  }

  addPost($event) {
    if (this.form.dirty && this.form.valid) {
      console.log(this.form);
    }
  }

}
