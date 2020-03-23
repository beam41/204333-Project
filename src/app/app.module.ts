import { NgModule } from '@angular/core';

// ngModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// component
import { AppComponent } from './app.component';
import { MemberComponent } from './room/member/member.component';
import { HomeComponent } from './home/home.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { RoomComponent } from './room/room.component';
import { RecordComponent } from './room/member/record/record.component';
import { DelDialogComponent } from './room/del-dialog/del-dialog.component';
import { EditDialogComponent } from './room/edit-dialog/edit-dialog.component';

// angularMat
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// other module
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

// env
import { environment } from '../environments/environment';

// pipe/directive
import { RoomNamePipe } from './room-name.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewRoomComponent,
    RoomComponent,
    MemberComponent,
    RecordComponent,
    DelDialogComponent,
    RoomNamePipe,
    EditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,

    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
