import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { HomeFragementComponent } from './home-fragement/home-fragement.component';
import { AddPostFragmentComponent } from './add-post-fragment/add-post-fragment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationService } from '../services/pagination.service';
import { PostComponent } from './post/post.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeFragementComponent,
    AddPostFragmentComponent,
    PostComponent
  ],
  providers: [
    PaginationService
  ],
  entryComponents: [
    AddPostFragmentComponent
  ]
})
export class HomeModule { }
