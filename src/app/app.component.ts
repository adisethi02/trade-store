import { Component } from '@angular/core';
import { Trade } from './model/trade';
import {MatDialog} from "@angular/material/dialog";
import {TradeDialogComponent} from "./trade-dialog/trade-dialog.component";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {TradeService} from "./trade-service/trade.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trade-store';
  rejectedTradesCount:any

  constructor(private dialog : MatDialog, private store: AngularFirestore, private tradeService : TradeService) {
    this.rejectedTradesCount = this.tradeService.getRejectedTradesCount();

    //below piece of code was initially used to push 500 dummy trades on the google firestore

    // const res = [];
    // let date = new Date();
    // let batch = this.store.firestore.batch()
    // for (let i = 0; i < 500; i++) {
    //   let version = i
    //   let trade = new Trade({
    //     tradeId: `TRADE_${version}`,
    //     version: version,
    //     counterPartyId: `Counter-Party-${version}`,
    //     bookId: `Book_${version}`,
    //     maturityDate: new Date().setDate(date.getDate()+10),
    //     createdDate: new Date()
    //   })
    //   let docRef = this.store.collection("trades").doc() as AngularFirestoreDocument<Trade>; //automatically generate unique id
    //   batch.set(docRef.ref,JSON.parse(JSON.stringify(trade)));
    // }
    // batch.commit();
  }

  ngOnInit() {
  }

  newTrade() : void{
    const dialogRef = this.dialog.open(TradeDialogComponent, {
      width: '270px',
      data: {
        trade: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (!result || !result.trade.tradeId) {
          return;
        }
        this.store.collection('trades').add(JSON.parse(JSON.stringify(new Trade(result.trade))))
      });
  }
}
