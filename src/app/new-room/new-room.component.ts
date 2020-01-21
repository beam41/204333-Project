import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss'],
})
export class NewRoomComponent implements OnInit {
  name = new FormControl('');
  pass = new FormControl('');

  newRoomId: string;

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {}

  submitForm() {
    this.fbs.createRoom(this.name.value.trim(), this.pass.value).then(val => (this.newRoomId = val.id));
  }

  clearId() {
    this.newRoomId = null;
  }

  get url(): string {
    return window.location.origin + '/room/' + this.newRoomId;
  }
}
