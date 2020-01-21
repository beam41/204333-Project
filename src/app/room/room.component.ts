import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseRoomService } from '../Services/firebase-room.service';
import { Room } from 'src/models/room';
import { Roompass } from 'src/models/roompass';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  isPassed: boolean = null;
  roomId: string;
  room: Room;
  roomLoading = true;
  pass: string = null;

  constructor(private route: ActivatedRoute, private fbr: FirebaseRoomService) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.fbr.getPwdInfo(this.roomId).subscribe({
      next: (val: Roompass) => {
        if (!val.isNeedPass || this.pass !== null) {
          this.loadRoom();
          return;
        }
        this.isPassed = !val.isNeedPass;
        this.route.queryParams.subscribe({
          next: params => {
            if (params.pwd) {
              this.pass = params.pwd;
              this.loadRoom();
            }
          },
        });
      },
    });
  }

  loadRoom() {
    this.isPassed = true;
    this.fbr.getRoom(this.roomId).subscribe({
      next: (val: Room) => {
        this.roomLoading = false;
        this.room = val;
      },
    });
  }

  get roomName() {
    return this.room.name !== '' ? this.room.name : 'Untitled' + this.roomId.slice(0, 5);
  }

  updateRoomInfo(name: string, pass: string) {
    this.pass = pass;
    this.fbr.updateRoomInfo(this.roomId, name, pass);
  }
}
