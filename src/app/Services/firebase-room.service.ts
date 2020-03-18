import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Member } from 'src/models/member';
import { Observable } from 'rxjs';
import { Room } from 'src/models/room';
import { Roompass } from 'src/models/roompass';
import { firestore } from 'firebase/app';

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
    return this.db.collection('rooms').add({ name, password, timeStamp: Date.now() } as Room);
  }

  updateRoomInfo(id: string, name: string, password: string): Promise<void> {
    return this.db
      .collection('rooms')
      .doc(id)
      .update({ name, password } as Room);
  }

  updateRoomExtraMo(id: string, extraMoney: number): void {
    this.db
      .collection('rooms')
      .doc(id)
      .update({ extraMoney } as Room);
  }

  addMember(id: string): void {
    const value = this.db.collection('members').add({ name: '', roomId: id } as Member);
    value.then(val => {
      this.db
        .collection('rooms')
        .doc(id)
        .update({
          members: firestore.FieldValue.arrayUnion(val),
        });
    });
  }

  delRoom(id: string): Promise<void> {
    return this.db
      .collection('rooms')
      .doc(id)
      .delete()
  }
}
