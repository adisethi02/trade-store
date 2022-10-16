export class Trade{
  id?: string
  tradeId: string
  version: number
  bookId: string
  counterPartyId: string
  maturityDate: Date
  createdDate: Date
  expired: boolean

  constructor (data: any) {
    this.id = data?.id;
    this.tradeId = data?.tradeId
    this.version = data?.version;
    this.bookId = data?.bookId;
    this.counterPartyId = data?.counterPartyId;
    this.maturityDate = data?.maturityDate ? new Date(data.maturityDate) : new Date();
    this.createdDate = data?.createdDate ? new Date(data.createdDate) : new Date();
    this.expired = this.maturityDate.getTime()<new Date().getTime()
  }
}
