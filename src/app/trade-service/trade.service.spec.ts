import { TestBed } from '@angular/core/testing';

import { TradeService } from './trade.service';
import {TradesSummary} from "../model/trades-summary";
import {Trade} from "../model/trade";

describe('TradeService', () => {
  let service: TradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeService);
  });

  it('should return current rejectedTradeCount value',()=>{
    expect(service.getRejectedTradesCount().value).toEqual(0)
  })

  it(' should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add when a new version of trade comes into the trade store', ()=>{
    let oldTrades = [new Trade({
      tradeId: 1,
      version: 1
    })]
    let newTrades = [new Trade({
      tradeId: 1,
      version: 2
    })]
    let tradeSummary = service.process(oldTrades,newTrades)
    expect(tradeSummary.rejectedTrades).toHaveSize(0)
    expect(tradeSummary.trades).toHaveSize(2)
  })

  it('should reject when lower version trade comes into the trade store', ()=>{
    let oldTrades = [new Trade({
      tradeId: 1,
      version: 1
    })]
    let newTrades = [new Trade({
      tradeId: 1,
      version: 0
    })]
    let tradeSummary = service.process(oldTrades,newTrades)
    expect(tradeSummary.rejectedTrades).toHaveSize(1)
    expect(tradeSummary.trades).toHaveSize(1)
  })

  it('should override the existing trade when same version trade comes into the trade store', ()=>{
    let oldTrades = [new Trade({
      tradeId: 1,
      version: 1,
      bookId: 'B1'
    })]
    let newTrades = [new Trade({
      tradeId: 1,
      version: 1,
      bookId: 'B2'
    })]
    let tradeSummary = service.process(oldTrades,newTrades)
    expect(tradeSummary.rejectedTrades).toHaveSize(0)
    expect(tradeSummary.trades).toHaveSize(1)
    expect(tradeSummary.trades[0].bookId).toEqual('B2')
  })

  it('should reject when trade with older maturity date comes into the trade store', ()=>{
    let newTrades = [new Trade({
      tradeId: 1,
      version: 1,
      maturityDate: new Date().setDate(new Date().getDate()-4)
    })]
    let tradeSummary = service.process([],newTrades)
    expect(tradeSummary.rejectedTrades).toHaveSize(1)
    expect(tradeSummary.trades).toHaveSize(0)
  })
});
