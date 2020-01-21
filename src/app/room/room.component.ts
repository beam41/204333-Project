import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
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
  room: Room[];
  roomLoading: boolean = true;

  constructor(private route: ActivatedRoute, private fbs: FirebaseService) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.fbs.getPwdInfo(this.roomId).subscribe((val: Roompass) => (this.isPassed = !val.isNeedPass));
  }

  loadRoom(pass) {
    this.isPassed = true;
    this.fbs.getRoom(this.roomId).subscribe(_ => (this.roomLoading = false));
  }
}
