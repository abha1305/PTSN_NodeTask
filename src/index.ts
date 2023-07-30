import { getCurrentStock } from "./components/stockComponent/stock.controller";
import {Request, Response} from 'express';
import dotenv from "dotenv";
import express from "express";
import { validateSKU } from "./core/middlewares/stock.middleware";
import StockHandler from '../src/components/stockComponent/stock.service';
import stock from '../src/data/stock.json';
import transactions from '../src/data/transactions.json';
import path from "path";
import httpStatus from "http-status";
// initialize configuration
dotenv.config();
const port = 8080; // default port to listen
const app = express();
const stockService = new StockHandler(stock,transactions);


app.get("/", (req: Request, res: Response)=>{
  res.sendFile(path.join(process.cwd()+'/UI/index.html'))
})

// define a route handler for the get stock API
app.get("/stock", [validateSKU], async (req: Request, res: Response) => {
  try{
    const data = await getCurrentStock(req.query.sku, stockService)
    res.send(httpStatus.OK,JSON.stringify(data))
  }catch(err: any){
    console.log(err,"error")
    res.send(err.status || httpStatus.BAD_REQUEST, {message: err.message || err})
  }
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

export default app