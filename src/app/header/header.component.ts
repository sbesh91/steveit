import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {}

  private updateUser = (userCred: firebase.auth.UserCredential) => {
    this.fireStore.doc(`users/${this.fireAuth.auth.currentUser.uid}`).set({
      profile: userCred.additionalUserInfo.profile,
      provider: userCred.additionalUserInfo.providerId
    });
  }

  login() {
    this.fireAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(this.updateUser);
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

}
