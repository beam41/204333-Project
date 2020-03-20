import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseRoomService } from 'src/app/services/firebase-room.service';
import { Router } from '@angular/router';
import { EditDialog } from 'src/models/editDialog';

@Component({
  selector: 'app-edit-dialog',
  template: `
    <h1 mat-dialog-title>Edit {{ data.room.name }}</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput autocomplete="off" placeholder="Name" [value]="data.room.name" #name />
      </mat-form-field>
      <mat-form-field>
        <input matInput autocomplete="off" placeholder="Password" [value]="''" #pass />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="updateRoomInfo(name.value, pass.value)">SAVE CHANGES</button>
      <button mat-button (click)="openDialog()">DELETE ROOM</button>
    </div>
  `,
  styles: [],
})
export class EditDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private fbr: FirebaseRoomService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: EditDialog,
  ) {}

  updateRoomInfo(name: string, pass: string) {
    this.fbr.updateRoomInfo(this.data.room.id, name, pass);
    this.dialogRef.close();
  }

  openDialog() {
    // now its del room but we need dialog
    this.fbr.delRoom(this.data.room.id).then(_ => this.router.navigate(['']));
    this.dialogRef.close();
  }
}
