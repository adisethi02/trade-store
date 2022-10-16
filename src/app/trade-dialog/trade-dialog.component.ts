import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Trade} from "../model/trade";

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.css']
})
export class TradeDialogComponent implements OnInit {

  private backupTrade: Partial<Trade> = {...this.data.trade};

  constructor(
    public dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TradeDialogData
  ) {
  }

  cancel(): void {
    this.data.trade.id = this.backupTrade.id;
    this.data.trade.createdDate = this.backupTrade.createdDate;
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }

}
export interface TradeDialogData {
  trade: Partial<Trade>;
  enableDelete: boolean;
}

export interface TradeDialogResult {
  trade: Trade;
  delete?: boolean;
}
