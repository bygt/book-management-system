import { CustomError } from "../utils/customError";
import { Request, Response, NextFunction } from "express";
import Joi  from "joi";
import { addPublisher, updatePublisher, deletePublisher, getOnePublisher, getAllPublisher } from "../services/publisherService";


export const addPublisherC = async (req: Request,res: Response,  next: NextFunction) => {
     const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().email().required()
    });
    const { error,value } = schema.validate(req.body);
    if (error) return next(new CustomError(error.details[0].message, 400));
  try {
   
    const publisher = await addPublisher(value, next);

    return res.status(200).send(publisher); // Return the publisher object after saving

  } catch (error) {
    next(error);
  }
};

export const updatePublisherC = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    email: Joi.string().email()
  });
  const { error, value } = schema.validate(req.body);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const publisher = await updatePublisher(req, next);
    return res.status(200).send(publisher);

  } catch (error) {
    next(error);
  }
}

export const deletePublisherC = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.string().required()
  });
  const { error } = schema.validate(req.params);
  if (error) return next(new CustomError(error.details[0].message, 400));
  try {
    const publisher = await deletePublisher(req, next);
    return res.status(200).send({message: "Deleted successfully", data:publisher});
  } catch (error) {
    next(error);
  }
}


export const getOnePublisherC = async (req: Request, res: Response, next: NextFunction) => {
    //joi check
    const schema = Joi.object({
        id: Joi.string().required()
    });
    const { error, value } = schema.validate(req.params);
    if (error) return next(new CustomError(error.details[0].message, 400));
    
  try {

    
    const publishers = await getOnePublisher(req, next);
    if(!publishers || publishers == null) return next(new CustomError("Publisher not found", 404));
    return res.status(200).send(publishers);


  } catch (error) {
    next(error);
  }
}

export const getAllPublisherC = async (req: Request, res: Response, next: NextFunction) => {
    // joi check for query params
    const schema = Joi.object({
        page: Joi.number(),
        limit: Joi.number()
    });
    const { error, value } = schema.validate(req.query);
    if (error) return next(new CustomError(error.details[0].message, 400));
    try {
        const publishers = await getAllPublisher(value.page, value.limit, next);
        return res.status(200).send(publishers);
    } catch (error) {
        next(error);
    }
}




