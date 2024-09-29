import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { addAuthor, deleteAuthor, updateAuthor, getAllAuthors, getOneAuthor} from '../services/authorService';
import Joi from 'joi';


export const addAuthorC = async (req: Request,res: Response, next: NextFunction) => {
    //check if all fields are provided with joi validation
    const schema = Joi.object({
            name: Joi.string().required(),
            country: Joi.string().required(),
            birthDate: Joi.date().required(),
            email: Joi.string().email().required()
    }); 
    const { error } = schema.validate(req.body);
    if (error) return next(new CustomError(error.details[0].message, 400));

      try {
         const author = await addAuthor(req, next);
         return res.status(201).send(author);     
      } catch (error) {
     next(error)
      }
    }

export const updateAuthorC = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string(),
    country: Joi.string(),
    birthDate: Joi.date(),
    email: Joi.string().email()
  });
  const { error } = schema.validate(req.body);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const author = await updateAuthor(req, next);
    return res.status(200).send(author);
  } catch (error) {
    next(error);
  }
}

export const deleteAuthorC = async (req: Request, res: Response, next: NextFunction) => {
  //joi check
  const schema = Joi.object({
    id: Joi.string().required()
  });
  const { error, value } = schema.validate(req.params);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const author = await deleteAuthor(req, next);
    return res.status(200).send({message: "Deleted successfully", data: author});
  } catch (error) {
    next(error);
  }
}

export const getAllAuthorsC = async (req: Request, res: Response, next: NextFunction) => {
  // joi check for query params
  const schema = Joi.object({
    page: Joi.number(),
    limit: Joi.number(),
    name: Joi.string(),
    country: Joi.string(),
    email: Joi.string().email(),
    sortBy: Joi.string(),
    sortOrder: Joi.string()
  });
  const { error, value } = schema.validate(req.query);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const authors = await getAllAuthors(value.page || 1, value.limit|| 10, next, req.query);
    return res.status(200).send(authors);
  } catch (error) {
    next(error);
  }
}

export const getOneAuthorC = async (req: Request, res: Response, next: NextFunction) => {
  //joi check for query params
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error , value} = schema.validate(req.params);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const author = await getOneAuthor( req, next);
    if (!author || author == null) return next(new CustomError("Author not found", 404));
    return res.status(200).send(author);
  } catch (error) {
    next(error);
  }
}
