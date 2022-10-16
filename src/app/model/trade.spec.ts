import {Trade} from "./trade";

describe('Trade Model', () => {

  const today = new Date();
  const tradeData = {
    id: 'FHAFKJDIFHA338E49',
    tradeId: 'CS_TRADE_1',
    version: 1,
    counterPartyId: 'CP-1',
    bookId: 'B1',
    maturityDate: today,
    createdDate: today
  };

  it('should be constructed', () => {
    const trade = new Trade(tradeData);
    expect(trade.id).toBe(tradeData.id);
    expect(trade.bookId).toBe(tradeData.bookId);
    expect(trade.version).toBe(tradeData.version);
    expect(trade.counterPartyId).toBe(tradeData.counterPartyId);
    expect(trade.bookId).toBe(tradeData.bookId);
    expect(trade.maturityDate.getTime()).toBe(tradeData.maturityDate.getTime());
    expect(trade.createdDate.getTime()).toBe(tradeData.createdDate.getTime());
    expect(trade.expired).toBe(true);
  });
});
