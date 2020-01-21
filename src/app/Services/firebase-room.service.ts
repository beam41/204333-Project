import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Room } from 'src/models/room';
import { Roompass } from 'src/models/roompass';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRoomService {
  constructor(private db: AngularFirestore) {}

  getRoom(id: string): Observable<Room> {
    return this.db
      .collection('rooms')
      .doc(id)
      .valueChanges() as Observable<Room>;
  }

  createRoom(name: string, password: string): Promise<DocumentReference> {
    const value = this.db.collection('rooms').add({ name, password } as Room);
    value.then(val => {
      this.db
        .collection('roompass')
        .doc(val.id)
        .set({ isNeedPass: !(password === '') } as Roompass);
    });
    return value;
  }

  updateRoomInfo(id: string, name: string, password: string): void {
    const value = this.db
      .collection('rooms')
      .doc(id)
      .update({ name, password } as Room);
    value.then(_ => {
      this.db
        .collection('roompass')
        .doc(id)
        .set({ isNeedPass: !(password === '') } as Roompass);
    });
  }

  getPwdInfo(id: string): Observable<Roompass> {
    return this.db
      .collection('roompass')
      .doc(id)
      .valueChanges() as Observable<Roompass>;
  }
}
