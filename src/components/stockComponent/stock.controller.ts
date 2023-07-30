import httpStatus from 'http-status';
import { StockData, TransactionData } from '../../core/interfaces/stock.interface';
import StockHandler from './stock.service';



export const getCurrentStock = async (sku: string, stockService: StockHandler): Promise<{ sku: string, qty: number }>=> {
  return new Promise((resolve, reject) => {
    let stockData: StockData | undefined = stockService.getInitialStockBySku(sku)
    const transactionData: TransactionData[] = stockService.getTransactionBySku(sku)

    if(!stockData && !transactionData.length){
      const err = new Error()
      reject({...err, status:httpStatus.NOT_FOUND, message:"Invalid SKU id provided"})
    }

    if(!stockData && transactionData.length){
      stockData = {sku:sku, stock:0}
    }
    const orderedTransactioCount = stockService.getTotalQtyByType(transactionData, 'order')
    const refundTransactioCount = stockService.getTotalQtyByType(transactionData, 'refund')
    const currentStock = stockData ? (stockData.stock - (orderedTransactioCount - refundTransactioCount)) : 0
    resolve({ sku: sku, qty: currentStock })
  })
}

