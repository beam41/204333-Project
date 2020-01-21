import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMemberService {
  constructor(private db: AngularFirestore) {}

  getMember(id: string): Observable<Member> {
    return this.db
      .collection('members')
      .doc(id)
      .valueChanges() as Observable<Member>;
  }

  updateMemberName(id: string, name: string): void {
    this.db
      .collection('members')
      .doc(id)
      .update({ name });
  }

  updateMemberChange(id: string, noChange: boolean): void {
    this.db
      .collection('members')
      .doc(id)
      .update({ noChange });
  }
}
