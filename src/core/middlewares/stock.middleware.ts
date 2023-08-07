import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const validateSKU = (req: Request, res: Response, next: NextFunction) => {
  if(!req.query.sku){
    res.send(httpStatus.BAD_REQUEST, {message: 'SKU id is required'})
  }else{
    return next()
  }
};
