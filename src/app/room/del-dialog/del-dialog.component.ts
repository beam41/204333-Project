import { Component, OnInit, Inject } from '@angular/core';
import { EditDialog } from 'src/models/editDialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseRoomService } from 'src/app/services/firebase-room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-del-dialog',
  template: `
    <h1 mat-dialog-title>Do you want to delete {{ data.room.name }}</h1>
    <div mat-dialog-content>
      <p>Do you really want to delete?</p>
      <p><strong class="warn">This room will gone forever!</strong></p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="primary" (click)="onYesClick()">YES</button>
      <button mat-flat-button mat-dialog-close>NO</button>
    </div>
  `,
  styles: [
    '.warn { color: #f44336}',
    `
      .mat-dialog-actions {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class DelDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DelDialogComponent>,
    private fbr: FirebaseRoomService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: EditDialog,
  ) {}

  onYesClick() {
    this.fbr.delRoom(this.data.roomId).then(_ => this.router.navigate(['']));
    this.dialogRef.close();
  }
}
