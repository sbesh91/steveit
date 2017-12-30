import { HomeFragementComponent } from './home-fragement/home-fragement.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const routes: Routes = [
  { path: '', component: HomeFragementComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AngularFirestoreModule
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
