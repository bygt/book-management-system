import Author from "../models/authorModel";
import { NextFunction, Request, Response } from "express";
import Book from "../models/bookModel";
import { CustomError } from "../utils/customError";
import { SortOrder } from "mongoose"; 

export const addAuthor = async (req: Request, next: NextFunction) => {
  const { name, country, birthDate, email } = req.body;
  try {
    // Check if all fields are provided
    if (!name || !birthDate || !country || !email) {
      throw new CustomError("All fields are required", 400);
    }

    // Check email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new CustomError("Invalid email format", 400);
    }

    // If author exists
    const authorCheck = await Author.findOne({ email });
    if (authorCheck) {
      throw new CustomError("Author already exists", 400);
    }

    const author = new Author(req.body);
    await author.save();
    return author; // Return the author object after saving
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = async (req: Request, next: NextFunction) => {
  const id  = req.params.id.trim();
  const { name, country, birthDate, email } = req.body;

  try {
    // if author not found, throw an error
    const existingAuthor = await Author.findById(id);
    if (!existingAuthor) throw new CustomError("Author not found", 404);

    // check if email is already taken
    if (email) {
      const emailCheck = await Author.findOne({ email });
      if (emailCheck && emailCheck.id !== id)
        throw new CustomError("Email already taken", 400);
    }
    const updateData = {
      name: name || existingAuthor.name,
      country: country || existingAuthor.country,
      birthDate: birthDate || existingAuthor.birthDate,
      email: email || existingAuthor.email,
    };

    // update author
    const newAuthor = await Author.findByIdAndUpdate(id, updateData, {new: true});
   
    return newAuthor
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (req: Request, next: NextFunction) => {
  const { id } = req.params;
  try {
    // if author not found, throw an error
    const existingAuthor = await Author.findById(id);
    if (!existingAuthor) throw new CustomError("Author not found", 404);

    //chek if author has books
    const authorBooks = await Book.findOne({ authorId: id });
    if (authorBooks) throw new CustomError("Author has books", 400);

    let deleted = await Author.findByIdAndDelete(id);

    return deleted;
  } catch (error) {
    next(error);
  }
};

export const getOneAuthor = async (req: Request, next: NextFunction) => {
  const { id } = req.params;
  
  try {
    const author = await Author.findById(id.trim());

    if (!author || author == null)  {
      return next(new CustomError("Author not found", 404)); 
    }
    
    return author;
  } catch (error) {
    next(error);
  }
};

export const getAllAuthors = async (
  pageData: number,
  limitData: number,
  next: NextFunction,
  query: { [key: string]: any }
) => {
  try {
    const page = pageData || 1;
    const limit = limitData || 10; 

    // Filter object
    const filter: { [key: string]: any } = {};
    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" }; // case-insensitive search by
    }
    if (query.country) {
      filter.country = { $regex: query.country, $options: "i" }; // filter by country
    }
    if (query.email) {
      filter.email = { $regex: query.email, $options: "i" }; //filter by email
    }

    const sort: Record<string, SortOrder> = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder === "desc" ? -1 : 1; // sort order: ascending or descending
    }

  
    const authors = await Author.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);

    const totalAuthors = await Author.countDocuments(filter); // total count of authors

    if (authors.length === 0) throw new CustomError("No authors found", 404);
    
    return {
      authors,
      totalAuthors,
      currentPage: page,
      totalPages: Math.ceil(totalAuthors / limit),
    };
  } catch (error) {
    next(error);
  }
};
