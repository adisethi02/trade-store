import {Trade} from "./trade";

export class TradesSummary{
  trades : Trade[]
  rejectedTrades: Trade[]

  constructor (trades: Trade[], rejectedTrades: Trade[]) {
    this.trades = trades
    this.rejectedTrades = rejectedTrades
  }
}
