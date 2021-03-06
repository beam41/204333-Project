import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CalculateService } from 'src/app/services/calculate.service';
import { FirebaseRoomService } from '../services/firebase-room.service';
import { Room } from 'src/models/room';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {
  roomId: string;
  room: Room;
  roomLoading = true;
  allow = false;
  formPassControl = new FormControl('');
  formPassMatcher = new MyErrorStateMatcher();
  memPayDat = {};
  extraMo = '';

  constructor(
    private route: ActivatedRoute,
    private fbr: FirebaseRoomService,
    private calc: CalculateService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.calc.memberPay.subscribe(val => {
      this.memPayDat = val;
    });
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.fbr.getRoom(this.roomId).subscribe({
      next: (val: Room) => {
        if (val.password === '') {
          this.allow = true;
        }
        this.room = val;
        this.extraMo = (this.room.extraMoney || 0).toString();
        this.calc.setExtraMoney(+this.room.extraMoney || 0);
        this.roomLoading = false;
        const temp = JSON.parse(localStorage.getItem('saveRooms')) || {};
        temp[this.roomId] = val.name;
        localStorage.setItem('saveRooms', JSON.stringify(temp));
      },
    });
  }

  ngOnDestroy() {
    this.calc.clearDat();
  }

  updateRoomInfo(name: string, pass: string) {
    this.fbr.updateRoomInfo(this.roomId, name, pass);
  }

  updateRoomExtraMo() {
    this.extraMo = this.extraMo.replace(/[^\d.]/g, '');
    this.calc.setExtraMoney(+this.extraMo);
    this.fbr.updateRoomExtraMo(this.roomId, +this.extraMo);
  }

  addMember() {
    this.fbr.addMember(this.roomId);
  }

  openDialog(): void {
    this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: { room: this.room, roomId: this.roomId },
    });
  }

  validate() {
    let pass = this.formPassControl.value;
    if (pass === this.room.password) {
      this.allow = true;
    } else {
      this.formPassControl.setErrors({ incorrect: true });
    }
  }
}
