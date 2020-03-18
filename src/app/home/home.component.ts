import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  savedRoom = [];

  constructor() {}

  ngOnInit() {
    const temp = JSON.parse(localStorage.getItem('saveRooms')) || {};
    
  }

  // get roomName() {
  //   return this.room.name !== '' ? this.room.name : 'Untitled-' + this.roomId.slice(0, 5);
  // }
}
