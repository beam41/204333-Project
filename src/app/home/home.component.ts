import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.savedRoom = Object.entries(temp);
  }

  delete(roomId) {
    const temp = {};
    const newsave = [];
    this.savedRoom.forEach(val => {
      if (roomId !== val[0]) {
        newsave.push(val);
        temp[val[0]] = val[1];
      }
    });
    this.savedRoom = newsave;
    localStorage.setItem('saveRooms', JSON.stringify(temp));
  }
}
