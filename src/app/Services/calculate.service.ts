import { Injectable } from '@angular/core';
import { Member } from 'src/models/member';
import { Record } from 'src/models/record';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  records = new Object();
  members = new Object();

  constructor() {}

  addRecord(rec: Record) {
    this.records[rec.id] = rec;
  }

  addMember(mem: Member) {
    this.members[mem.id] = mem;
  }

  delRecord(id: string) {
    delete this.records[id];
  }

  delMember(id: string) {
    delete this.members[id];
  }
}
