import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TradeDialogComponent} from './trade-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('TradeDialogComponent', () => {
  let component: TradeDialogComponent;
  let fixture: ComponentFixture<TradeDialogComponent>;
  let data= {
    trade: {
      tradeId:1,
      id:1
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: data
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
