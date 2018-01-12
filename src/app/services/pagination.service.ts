import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import { QueryConfig } from './QueryConfig';

@Injectable()
export class PaginationService {
  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);
  private query: QueryConfig;
  // Observable data
  data: Observable<any> = this._data.asObservable();
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  constructor(private afs: AngularFirestore) { }
  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(opts: QueryConfig) {
    this._done = new BehaviorSubject(false);
    this._loading = new BehaviorSubject(false);
    this._data = new BehaviorSubject([]);

    this.query = opts;

    const first = this.afs.collection(this.query.path, (ref: firebase.firestore.CollectionReference | firebase.firestore.Query) => {
      return this.setFiltersAndSorts(ref);
    });

    this.mapAndUpdate(first);
    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
      .scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      });
  }

  // Retrieves additional data from firestore
  more() {
    const cursor = this.getCursor();
    const more = this.afs.collection(this.query.path, (ref: firebase.firestore.CollectionReference | firebase.firestore.Query) => {
      ref = this.setFiltersAndSorts(ref);
      return ref.startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }

  private setFiltersAndSorts(queryRef: firebase.firestore.CollectionReference | firebase.firestore.Query) {
    for (const field of this.query.fields) {
      queryRef = queryRef.orderBy(field.field, field.direction);
    }

    for (const filter of this.query.filters) {
      queryRef = queryRef.where(filter.field, filter.compare, filter.value);
    }

    return queryRef.limit(this.query.limit);
  }

  // Determines the doc snapshot to paginate query
  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }

  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {
    if (this._done.value || this._loading.value) { return; }
    // loading
    this._loading.next(true);
    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges(['added', 'removed'])
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;
          return { ...data, doc };
        });

        // If prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values;
        // update source with new values, done loading
        this._data.next(values);
        this._loading.next(false);
        // no more values, mark done
        if (!values.length) {
          this._done.next(true);
        }
      })
      .take(1)
      .subscribe();
  }
}
