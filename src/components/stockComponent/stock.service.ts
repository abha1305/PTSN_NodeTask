import { StockData, TransactionData } from '.../../core/interfaces/stock.interface';

export default class StockHandler {
  private stock: StockData[];
  private transactions: TransactionData[];

  constructor(stock: StockData[],transactions: TransactionData[]) {
    this.stock = stock;
    this.transactions = transactions;
  }

  getInitialStockBySku(sku: string){
    const stockData = this.stock.find((data)=> data.sku.toLowerCase() === sku.toLowerCase())
    return stockData
  }

  getTransactionBySku(sku: string){
    const transactionData = this.transactions.filter((data)=> data.sku.toLowerCase() === sku.toLowerCase())
    return transactionData
  }

  getTotalQtyByType(transactions: TransactionData[], type: string){
    const orderTransactionCount = transactions.reduce((acc,data)=>{
      if(data.type.toLowerCase() === type.toLowerCase()){
        return acc += data.qty
      }else{
        return acc+=0
      }
    },0)
    return orderTransactionCount
  }


}