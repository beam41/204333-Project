import { Component, OnInit, Input } from '@angular/core';
import { Record } from 'src/models/record';
import { FirebaseRecordService } from 'src/app/services/firebase-record.service';
import { CalculateService } from 'src/app/services/calculate.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit {
  record: Record;
  @Input() memberId: string;

  constructor(private fbrec: FirebaseRecordService, private calc: CalculateService) {}

  ngOnInit() {}

  @Input()
  set recordID(id: string) {
    this.fbrec.getRecord(id).subscribe({
      next: (val: Record) => {
        this.record = { id, ...val };
        this.calc.addRecord(this.record);
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

  delRec() {
    this.calc.delRecord(this.record.id);
    this.fbrec.delRecord(this.record.id, this.memberId);
  }
}
