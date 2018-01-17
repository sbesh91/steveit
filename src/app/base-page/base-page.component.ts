import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent {

  constructor(
    public fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router) {}



  private updateUser(userCred: firebase.auth.UserCredential) {
    return this.fireStore.doc(`users/${this.fireAuth.auth.currentUser.uid}`).set({
      profile: userCred.additionalUserInfo.profile,
      provider: userCred.additionalUserInfo.providerId
    });
  }

  async login() {
    const userCred = await this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    await this.updateUser(userCred);
  }

  logout() {
    this.fireAuth.auth.signOut();
  }


}
