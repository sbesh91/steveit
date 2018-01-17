import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showBackButton: boolean;

  constructor(
    public fireAuth: AngularFireAuth,
    private location: Location) {}

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

}
