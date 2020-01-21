import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Room } from 'src/models/room';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  get(): Observable<unknown> {
    return this.db.collection('rooms').valueChanges();
  }

  createRoom(name: string, password: string): Promise<DocumentReference> {
    return this.db.collection('rooms').add({name, password} as Room);
  }
}
