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

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddPostFragmentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.types = this.data.types;
    // tslint:disable-next-line:max-line-length
    const urlRegex = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/);
    this.form = this.fb.group({
      'label': ['', [Validators.required]],
      'link': ['', [
        Validators.required,
        Validators.pattern(urlRegex)
      ]],
      'body': ['', [Validators.required]],
      'type': ['', [Validators.required]]
    });
  }

  addPost($event) {
    if (this.form.dirty && this.form.valid) {
      this.dialogRef.close(new Post(this.form.value));
    }
  }

  close() {
    this.dialogRef.close();
  }

}
