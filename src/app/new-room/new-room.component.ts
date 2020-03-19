import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { FirebaseRoomService } from '../services/firebase-room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss'],
})
export class NewRoomComponent implements OnInit {
  name = new FormControl('');
  pass = new FormControl('');

  newRoomId: string;

  constructor(private fbr: FirebaseRoomService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  submitForm() {
    this.fbr.createRoom(this.name.value.trim(), this.pass.value).then(val => (this.newRoomId = val.id));
  }

  clearId() {
    this.newRoomId = null;
    this.name = new FormControl('');
    this.pass = new FormControl('');
  }

  get url(): string {
    return window.location.origin + '/room/' + this.newRoomId;
  }

  copy() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.url);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.snackBar.open('Copied!', 'OK', {
      duration: 2000,
    });
  }
}
