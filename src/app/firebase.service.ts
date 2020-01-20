import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  get(): Observable<unknown> {
    return this.db
      .collection('test1')
      .doc('8sJ1pRWDdkY1i8sWinWC')
      .valueChanges();
  }
}
