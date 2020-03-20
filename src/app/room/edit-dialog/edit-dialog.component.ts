import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditDialog } from 'src/models/editDialog';
import { FirebaseRoomService } from 'src/app/services/firebase-room.service';
import { Router } from '@angular/router';
import { DelDialogComponent } from '../del-dialog/del-dialog.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private fbr: FirebaseRoomService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: EditDialog,
  ) {}

  updateRoomInfo(name: string, pass: string) {
    this.fbr.updateRoomInfo(this.data.roomId, name, pass);
    this.dialogRef.close();
  }

  openDialog() {
    this.dialog.open(DelDialogComponent, {
      width: '300px',
      data: { room: this.data.room, roomId: this.data.roomId },
    });
  }
}
