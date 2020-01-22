import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/models/record';
import { FirebaseRecordService } from 'src/app/Services/firebase-record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit {
  record: Record;

  constructor(private fbrec: FirebaseRecordService) {}

  ngOnInit() {}

  @Input()
  set recordID(id: string) {
    this.fbrec.getRecord(id).subscribe({
      next: (val: Record) => {
        this.record = { id, ...val };
      },
    });
  }

  recordNameUpdate() {
    this.fbrec.updateRecordName(this.record.id, this.record.name);
  }

  recordAmountUpdate() {
    this.fbrec.updateRecordAmount(this.record.id, this.record.amount);
  }

  toggleDonateChange(event) {
    this.record.isDonation = event.checked;
    this.fbrec.updateRecordIsDonation(this.record.id, event.checked);
  }
}
