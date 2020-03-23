import { Injectable } from '@angular/core';
import { Member, MemberPay } from 'src/models/member';
import { Record } from 'src/models/record';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  private records = new Object();
  private members = new Object();
  private extraMo = 0;
  public memberPay = new Subject<object>();

  constructor() {}

  setExtraMoney(amount: number) {
    this.extraMo = amount;
    this.memPay();
  }

  addRecord(rec: Record) {
    this.records[rec.id] = rec;
    this.memPay();
  }

  addMember(mem: Member) {
    this.members[mem.id] = mem;
    this.memPay();
  }

  delRecord(id: string) {
    delete this.records[id];
    this.memPay();
  }

  delMember(id: string) {
    delete this.members[id];
    this.memPay();
  }

  calcPrice() {
    let sum = 0;
    Object.values(this.records).forEach(val => {
      if (!val.isDonation) {
        sum += val.amount;
      }
    });
    return sum;
  }

  calcMemberTotal() {
    return Object.entries(this.members).map(val => {
      let total = 0;
      Object.values(this.records).forEach(rec => {
        if (rec.memberId === val[0] && !rec.isDonation) {
          total += rec.amount;
        }
      });
      return { id: val[0], name: val[1].name, noChange: val[1].noChange, total } as MemberPay;
    });
  }

  calcDonation() {
    let sum = 0;
    Object.values(this.records).forEach(val => {
      if (val.isDonation) {
        sum += val.amount;
      }
    });
    return sum;
  }

  memPay() {
    const memberList = this.calcMemberTotal();
    const sumPrice = this.calcPrice();
    const extaMo = this.extraMo + this.calcDonation();
    let memlen = memberList.length;
    const totalPaySplit = (sumPrice - extaMo) / memlen;
    let noChangeExcess = 0;
    memberList.forEach(val => {
      let toPay = totalPaySplit - val.total;
      if (toPay < 0 && val.noChange) {
        noChangeExcess += toPay;
        val.toPay = 0;
        memlen -= 1;
      } else {
        val.toPay = toPay;
      }
    });
    noChangeExcess = noChangeExcess / memlen;
    memberList.forEach(val => {
      if (!val.noChange || val.toPay > 0) {
        val.toPay += noChangeExcess;
      }
    });
    const memberObj = {};
    memberList.forEach(val => {
      memberObj[val.id] = val;
    });
    this.memberPay.next(memberObj);
  }
}
