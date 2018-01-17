import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router) {}

    ngOnInit() {
      this.fireAuth.authState.subscribe((data) => {
        return data ? this.redirectToApp() : this.redirectToBase();
      });
    }


    private redirectToApp() {
      this.router.navigateByUrl('app');
    }

    private redirectToBase() {
      this.router.navigateByUrl('');
    }
}
