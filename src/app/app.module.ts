import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

// component
import { HomeComponent } from './home/home.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { RoomComponent } from './room/room.component';
import { MemberComponent } from './room/member/member.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NewRoomComponent, RoomComponent, MemberComponent],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
