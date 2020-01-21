import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/models/member';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  member: Member;

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {}

  @Input()
  set memberID(id: string) {
    console.log(id);
    this.fbs.getMember(id).subscribe((val: Member) => (this.member = { id, ...val }));
  }
}
