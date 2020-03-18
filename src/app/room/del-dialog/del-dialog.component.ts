import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-del-dialog',
  template: `
    <!-- <h1 mat-dialog-title>Do you want to delete</h1>
    <div mat-dialog-content>
      <p>Do you really want to delete? <span class="red">This room will gone forever!</span></p>
      <mat-form-field>
        <mat-label>Favorite Animal</mat-label>
        <input matInput [(ngModel)]="data.animal">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
    </div> -->
  `,
  styles: ['.red { color: red}']
})
export class DelDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
