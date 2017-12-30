import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router) {}

  ngOnInit() {
    this.fireAuth.authState.subscribe((data) => {
      return data ? this.redirectToApp() : this.redirectToBase();
    });
  }

  private updateUser(userCred: firebase.auth.UserCredential) {
    return this.fireStore.doc(`users/${this.fireAuth.auth.currentUser.uid}`).set({
      profile: userCred.additionalUserInfo.profile,
      provider: userCred.additionalUserInfo.providerId
    });
  }

  private redirectToApp() {
    this.router.navigateByUrl('app');
  }

  private redirectToBase() {
    this.router.navigateByUrl('');
  }

  async login() {
    const userCred = await this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    await this.updateUser(userCred);
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

}
