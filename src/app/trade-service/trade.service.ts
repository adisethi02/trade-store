import { Injectable } from '@angular/core';
import {Trade} from "../model/trade";
import {BehaviorSubject} from "rxjs";
import {TradesSummary} from "../model/trades-summary";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  rejectedTradesCount = new BehaviorSubject(0);

  constructor() { }

  getRejectedTradesCount(){
    return this.rejectedTradesCount;
  }

  process (oldTrades: Trade[], newTrades: Trade[]) : TradesSummary{

    // sorting based on created timestamp so that in case of same version, the latest record should take precedence for overriding
    newTrades.sort((a,b)=>new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())

    const replica = [...oldTrades];

    //collecting rejected trades here so that later on we can enhance the existing ui and show this list in a side nav after clicking notification icon
    const rejectedTrades = []

    for (const trade of newTrades) {

      // rejecting trade with older maturity data
      if (new Date(trade.maturityDate).getTime() < new Date().getTime()) {
        rejectedTrades.push(trade)
        continue;
      }

      // Finding all the existing trades of a particular tradeId in a sorted manner by their version to find the max current version
      const tradesWithSameTradeId = replica.filter(data => data.tradeId === trade.tradeId).sort((a, b) => b.version - a.version);
      // rejecting trade if the current version is lower than existing max mersion
      if (tradesWithSameTradeId?.[0]?.version > trade.version) {
        rejectedTrades.push(trade)
        continue;
      }

      // finding the trade with same tradeId and version to override the remaining values
      const duplicateTrade = replica.find(data => data.tradeId === trade.tradeId && data.version === trade.version);
      if (duplicateTrade) {
        replica[replica.indexOf(duplicateTrade)] = trade;
        continue;
      }

      replica.push(trade);
    }

    this.rejectedTradesCount.next(rejectedTrades.length+this.rejectedTradesCount.value)
    return new TradesSummary(replica,rejectedTrades)
  };

}
