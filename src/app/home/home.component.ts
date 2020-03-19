import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  savedRoom = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const temp = JSON.parse(localStorage.getItem('saveRooms')) || {};
    this.savedRoom = Object.entries(temp);
  }
}
