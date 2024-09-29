import {addBook, updateBook, deleteBook, getAllBooks, getOneBook} from "./../services/bookService";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import Joi, { number, string } from 'joi';

export const addBookC = async (req: Request, res: Response, next: NextFunction) => {
  //validation with joi
  const schema = Joi.object({
    title: Joi.string().required(),
    authorId: Joi.string().required(),
    price: Joi.number().required(),
    ISBN: Joi.string().required(),
    language: Joi.string().required(),
    pages: Joi.number().integer().min(1).required(),
    publisherId: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body); // get validated data with 'value'
  if (error) return next(new CustomError(error.details[0].message, 400));    

  try {
    const book = await addBook(value, next);
    return res.status(201).send(book);
  } catch (error) {
    next(error);
  }
};

export const updateBookC = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string(),
    authorId: Joi.string(),
    price: Joi.number(),
    ISBN: Joi.string(),
    language: Joi.string(),
    pages: Joi.number(),
    publisherId: Joi.string(),
  });
  const { error, value } = schema.validate(req.body); // get validated data with 'value'
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    //send req to service for accessing to req.body and req.params
    const book = await updateBook( req, next);
    return res.status(200).send(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBookC = async (req: Request, res: Response, next: NextFunction) => {
  // joi check
  const schema = Joi.object({
    id: Joi.string().required()
  });
  const { error } = schema.validate(req.params);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const book = await deleteBook(req.params.id, next);
    return res.status(200).send(book);
  } catch (error) {
    next(error);
  }
};

export const getAllBooksC = async (req: Request, res: Response, next: NextFunction) => {
  // joi check for query params
  const schema = Joi.object({
    page: Joi.number(),
    limit: Joi.number(),
    title: Joi.string(),
    authorId: Joi.string(),
    ISBN: Joi.string(),
    language: Joi.string(),
    publisherId: Joi.string(),
    sortBy: Joi.string(),
    sortOrder: Joi.string(),
  });
  const { error } = schema.validate(req.query); 
  if (error) return next(new CustomError(error.details[0].message, 400));

  try {
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;     

    const book = await getAllBooks(page, limit, next, req.query);
    return res.status(200).send(book);
  } catch (error) {
    next(error);
  }
}

export const getOneBookC = async (req: Request, res: Response, next: NextFunction) => {
  // joi check for query params
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const book = await getOneBook(req.params.id, next);
    if(!book || book == null) return next(new CustomError("Book not found", 404));
    return res.status(200).send(book);
  } catch (error) {
    next(error);
  }
}


