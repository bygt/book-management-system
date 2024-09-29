import Publisher from "../models/publisherModel";
import { Request, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { IPublisher } from "../models/publisherModel";
import Book from "../models/bookModel";


export const addPublisher = async (body : IPublisher, next: NextFunction) => {
  const { name, phone, address, email } = body;
  try {

    // Check if all fields are provided
    if (!name || !phone || !email || !address) {
       
      throw new CustomError("All fields are required", 400);
    }
    // Check email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new CustomError("Invalid email format", 400);
    }
    // If publisher exists
    const publisherCheck = await Publisher.findOne({ email });
    if (publisherCheck) {
      throw new CustomError("Publisher already exists", 400);
    }

    const publisher = new Publisher(body);
    await publisher.save();
    return publisher; // Return the publisher object after saving

  } catch (error) {
    next(error);
  }
};

export const updatePublisher = async (req: Request, next: NextFunction) => {
  const { id } = req.params;
  const { name, phone, email, address } = req.body;

  try {
    // if publisher not found, throw an error
    const existingPublisher = await Publisher.findById(id);
    if (!existingPublisher) throw new CustomError("Publisher not found", 404);

    // check if email is already taken
    if (email) {
      const emailCheck = await Publisher.findOne({ email });
      if (emailCheck && emailCheck.id !== id)
        throw new CustomError("Email already taken", 400);
    }
    //check if phone is already taken
    if (phone) {
      const phoneCheck = await Publisher.findOne({ phone });
        if (phoneCheck && phoneCheck.id !== id)
            throw new CustomError("Phone already taken", 400);
    }

    const updateData = {
      name: name || existingPublisher.name,
      country: phone || existingPublisher.phone,
      email: email || existingPublisher.email,
      address: address || existingPublisher.address
    };

    // update publisher
    const newPublisher = await Publisher.findByIdAndUpdate(id, updateData, {new: true});
    if(!newPublisher) throw new CustomError("Publisher not found", 404);
    return newPublisher; 


  } catch (error) {
    next(error);
  }
};

export const deletePublisher= async (req: Request, next: NextFunction) => {
    const { id } = req.params;
    try {
        // if publisher not found, throw an error
        const existingPublisher = await Publisher.findById(id);
        if (!existingPublisher) throw new CustomError("Publisher not found", 404);

        //check if publisher has books
        const books = await Book.find({ publisherId: id });
        if (books.length > 0) {
          throw new CustomError("Publisher has books, cannot delete", 400);}
    
        const deleted = await Publisher.findByIdAndDelete(id);        
        return deleted;
    
    } catch (error) {
        next(error);
    }
}

export const getOnePublisher = async(req: Request, next : NextFunction) => {
    const id = req.params.id.trim();
    try {
        const publisher = await Publisher.findById(id.trim());

        if (!publisher || publisher == null)  {
            return next(new CustomError("Publisher not found", 404));
          }

        return publisher;
        
    } catch (error) {
        next(error);
        
    }

}


export const getAllPublisher = async (pageData: number, limitData: number, next: NextFunction) => {
    try {
      const page = pageData || 1; // current page
      const limit = limitData || 10; // publishers per page
    
      const publishers = await Publisher.find()
        .skip((page - 1) * limit) 
        .limit(limit)
  
      const totalPublisher = await Publisher.countDocuments(); 
  
      if (publishers.length === 0) throw new CustomError("No publishers found", 404);
  
      return {
        publishers,
        totalPublisher,
        currentPage: page,
        totalPages: Math.ceil(totalPublisher / limit),
      };
    } catch (error) {
      next(error);
    }
  };
  