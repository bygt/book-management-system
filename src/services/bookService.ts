import Author from "../models/authorModel";
import Book, { IBook} from "../models/bookModel";
import { NextFunction, Request } from "express";
import { CustomError } from "../utils/customError";
import Publisher from "../models/publisherModel";
import { SortOrder } from "mongoose";

//book data should be in the format of IBook interface
export const addBook = async (bookData: IBook, next: NextFunction) => {
  const { title, authorId, price, ISBN, language, pages, publisherId } =
    bookData;

  try {
    //check if book already exists
    const bookCheck = await Book.findOne({ ISBN });
    if (bookCheck)
      throw new CustomError("Book already exists, try update", 400);

    // check if author exists
    const author = await Author.findById(authorId);
    if (!author) throw new CustomError("Author not found", 404);

    // check if publisher exists
    const publisher = await Publisher.findById(publisherId);

    if (!publisher) {
      throw new CustomError("Publisher not found", 404);
    }

    // create a new book with the provided
    const book = new Book(bookData);
    await book.save();
    return book;
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, next: NextFunction) => {
  const { id } = req.params;
  const { title, authorId, price, ISBN, language, pages, publisherId } =
  req.body;

  try {
    // if book not found, throw an error
    const existingBook = await Book.findById(id);
    if (!existingBook) throw new CustomError("Book not found", 404);

    // if same ISBN already exists, throw an error
    const bookCheck = await Book.findOne({ ISBN,  _id: { $ne: id }  });// not equal to the current book's id

    if (bookCheck) throw new CustomError("Book already exists", 400);

    // if authorId is provided, check if author exists
    if (authorId) {
      const author = await Author.findById(authorId);
      if (!author) {
        throw new CustomError("Author not found", 404);
      }
    }
    // if publisherId is provided, check if publisher exists
    if (publisherId) {
      const publisher = await Publisher.findById(publisherId);
      if (!publisher) throw new CustomError("Publisher not found", 404);
    }

    // create an object with the updated data
    const updatedData = {
      title: title || existingBook.title,
      authorId: authorId || existingBook.authorId,
      price: price || existingBook.price,
      ISBN: ISBN || existingBook.ISBN,
      language: language || existingBook.language,
      pages: pages || existingBook.pages,
      publisherId: publisherId || existingBook.publisherId,
    };

    // update the book with the updated data
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) throw new CustomError("Error while updating book", 404);

    return updatedBook;
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (id: string, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) throw new CustomError("Book not found", 404);
    return book;
  } catch (error) {
    next(error);
  }
};

export const getOneBook = async (id: string, next: NextFunction) => {
  try {
    // get the book with the provided id
    //check if book exists
    
    const book = await Book.findById(id); // authorId field will be populated with the author details
    if(!book || book == null) throw new CustomError("Book not found", 404);

    const populatedBook = await book.populate([{ path: 'authorId' }, { path: 'publisherId' }]);
    
    return populatedBook;
  } catch (error) {
    next(error);
  }1
};

export const getAllBooks = async (pageData: number, limitData: number, next: NextFunction, query: { [key: string]: any }) => {
  try {

    const page = pageData || 1; 
    const limit = limitData || 10; 

    // Filter object
    const filter: { [key: string]: any } = {};// key value pair for filtering
    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' }; // search by title with case-insensitive
    }
    if (query.authorId) {
      filter.authorId = query.authorId; // filter by author id
    }
    if (query.publisherId) {
      filter.publisherId = query.publisherId; // filter by publisher id
    }
    if (query.language) {
      filter.language = { $regex: query.language, $options: 'i' }; // filter by ISBN
    }

    const sort: Record<string, SortOrder> = {};
    if (query.sortBy) {
      sort[query.sortBy] = query.sortOrder === 'desc' ? -1 : 1; 
    }

    const books = await Book.find(filter)
      .skip((page - 1) * limit) 
      .limit(limit)
      .sort(sort) 
      .populate(["authorId", "publisherId"]); 

    const totalBooks = await Book.countDocuments(filter); 

    if (books.length === 0) throw new CustomError("No books found", 404);

    return {
      books,
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
    };
  } catch (error) {
    next(error);
  }
};
