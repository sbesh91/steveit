import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    @Inject(DOCUMENT) private document: any) {}

    ngOnInit() {
      this.fireAuth.authState.subscribe((data) => {
        return data ? this.redirectToApp() : this.redirectToBase();
      });
    }


    private redirectToApp() {
      if (this.document.location.href.includes('/app')) {
        return;
      }
      this.router.navigateByUrl('app');
    }

    private redirectToBase() {
      this.router.navigateByUrl('');
    }
}
