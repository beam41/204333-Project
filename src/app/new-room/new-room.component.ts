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
    this.fbs.createRoom(this.name.value, this.pass.value).then(val => (this.newRoomId = val.id));
  }

  clearForm() {
    this.name = new FormControl('');
    this.pass = new FormControl('');
    this.newRoomId = null;
  }

  get url(): string {
    return window.location.origin + '/' + this.newRoomId;
  }
}
