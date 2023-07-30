import { getCurrentStock } from '../components/stockComponent/stock.controller';
import StockHandler from '../components/stockComponent/stock.service'
import stock from './mocks/stock.json'
import  transactions  from './mocks/transactions.json';

const req = {
  query:{
    sku: 'LTV719449/39/39'
  }
};

  describe('Current Stock [GET] /stock/', () => {
    const stockService = new StockHandler(stock, transactions)
    test('expect function definition to exists', async () => {
      expect(getCurrentStock).toBeDefined()
    });

    test('should return promise', async () => {
      const data =  getCurrentStock(req.query.sku, stockService)
      const promise = new Promise((resolve, reject)=>{})
      expect(data).toBeInstanceOf(Promise)
    });

    test('should return stock data for LTV719449/39/39 sku', async () => {
      const data = await getCurrentStock(req.query.sku, stockService)
      const expectedData = {"sku":"LTV719449/39/39","qty":8525}
      expect(data).toEqual(expectedData)
    });

    test('should return invalid sku id response', async () => {
      try{
        await getCurrentStock('testsku', stockService)
      }catch(err){
        expect(err).toEqual({"status":404, message: "Invalid SKU id provided"});
      }  
    });

    test('should return -ve stock for KGD740425/40/48', async () => {
      const data = await getCurrentStock('KGD740425/40/48', stockService)
      const expectedData = {"sku":"KGD740425/40/48","qty":-6}
      expect(data).toEqual(expectedData)
    });
  });
