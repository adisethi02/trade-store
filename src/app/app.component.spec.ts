import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {environment} from "../environments/environment";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AgGridModule} from "ag-grid-angular";
import {MatBadgeModule} from "@angular/material/badge";

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AngularFirestore,
          value: {}
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'trade-store'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('trade-store');
  });

  it('should add new trade', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.newTrade()).toBeUndefined()
  });
});
