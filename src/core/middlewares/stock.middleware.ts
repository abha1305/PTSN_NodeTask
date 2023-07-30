import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const validateSKU = (req: Request, res: Response, next: NextFunction) => {
  if(!req.query.sku){
    // const err = new Error()
    // return next ({...err, status: httpStatus.BAD_REQUEST, message:'Provide a valid sku id'})
    res.send(httpStatus.BAD_REQUEST, {message: 'SKU id is required'})
  }else{
    return next()
  }
};
