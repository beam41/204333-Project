import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CalculateService } from 'src/app/services/calculate.service';
import { FirebaseRoomService } from '../services/firebase-room.service';
import { Room } from 'src/models/room';
import { Roompass } from 'src/models/roompass';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomId: string;
  room: Room;
  roomLoading = true;
  allow = false;
  passError = false;

  constructor(
    private route: ActivatedRoute,
    private fbr: FirebaseRoomService,
    private calc: CalculateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.fbr.getRoom(this.roomId).subscribe({
      next: (val: Room) => {
        if (val.password === '') {
          this.allow = true;
        }
        this.room = val;
        this.roomLoading = false;
        const temp = JSON.parse(localStorage.getItem('saveRooms')) || {};
        temp[this.roomId] = val.name;
        localStorage.setItem('saveRooms', JSON.stringify(temp));
      },
    });
  }

  get roomName() {
    return this.room.name !== '' ? this.room.name : 'Untitled-' + this.roomId.slice(0, 5);
  }

  updateRoomInfo(name: string, pass: string) {
    this.fbr.updateRoomInfo(this.roomId, name, pass);
  }

  updateRoomExtraMo() {
    this.room.extraMoney = +this.room.extraMoney;
    this.calc.extraMoney = this.room.extraMoney;
    this.fbr.updateRoomExtraMo(this.roomId, +this.room.extraMoney);
  }

  addMember() {
    this.fbr.addMember(this.roomId);
  }

  openDialog() {
    // now its del room but we need dialog
    this.fbr.delRoom(this.roomId).then(_ => this.router.navigate(['']));
  }

  validate(pass) {
    if (pass === this.room.password) {
      this.allow = true;
    } else {
      this.passError = true;
    }
  }
}
