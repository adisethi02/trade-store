import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component'
import {MatInputModule} from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { TradeGridComponent } from './trade-grid/trade-grid.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AgGridModule } from 'ag-grid-angular';
import {MatBadgeModule} from "@angular/material/badge";
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    TradeDialogComponent,
    TradeGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatTableModule,
    MatPaginatorModule,
    AgGridModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
