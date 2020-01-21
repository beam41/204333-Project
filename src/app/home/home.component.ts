import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  roomList: any;

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {
    this.fbs.get().subscribe(val => {
      this.roomList = val;
      console.log(this.roomList);
    });
  }
}
