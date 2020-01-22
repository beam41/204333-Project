import { Component, OnInit, Input, Output } from '@angular/core';
import { Member } from 'src/models/member';
import { FirebaseMemberService } from 'src/app/Services/firebase-member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  member: Member;
  mustPay: number;

  constructor(private fbm: FirebaseMemberService) {}

  ngOnInit() {}

  @Input()
  set memberID(id: string) {
    this.fbm.getMember(id).subscribe({
      next: (val: Member) => {
        this.member = { id, ...val };
      },
    });
  }

  memberNameUpdate() {
    this.fbm.updateMemberName(this.member.id, this.member.name);
  }

  toggleChange(event) {
    this.member.noChange = event.checked;
    this.fbm.updateMemberChange(this.member.id, event.checked);
  }

  addRec() {
    this.fbm.addRecord(this.member.id, this.member.roomId);
  }
}
