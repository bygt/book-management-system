import { TypeParameter } from './../node_modules/@babel/types/lib/index-legacy.d';
import { IBook } from './../src/models/bookModel';
import { addBook, updateBook, deleteBook, getOneBook, getAllBooks } from '../src/services/bookService';
import { CustomError } from '../src/utils/customError';
import Book from '../src/models/bookModel'; 
import Author from '../src/models/authorModel'; 
import Publisher from '../src/models/publisherModel';


jest.mock('../src/models/bookModel');
jest.mock('../src/models/authorModel');
jest.mock('../src/models/publisherModel');

describe('addBook', () => {
  let req: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {} }; 
    next = jest.fn(); 
    jest.clearAllMocks(); 
    jest.resetAllMocks()

  });

  it('should throw an error if book already exists', async () => {
    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };
    
    (Book.findOne as jest.Mock).mockResolvedValueOnce(true); // Book already exists

    await addBook(req, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Book already exists, try update');
  });

  jest.clearAllMocks()
  it('should throw an error if publisher does not exist', async () => {
    (Book.findOne as jest.Mock).mockResolvedValueOnce(null); // Book does not exist
    (Author.findById as jest.Mock).mockResolvedValueOnce(true); // Author exists
    (Publisher.findById as jest.Mock).mockResolvedValueOnce(null); // Publisher does not exist

    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };
    
    await addBook(req, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Publisher not found');
  });
 
  it('should add a book successfully', async () => {
    
    (Book.findOne as jest.Mock).mockResolvedValueOnce(null);
    (Author.findById as jest.Mock).mockResolvedValueOnce(true);
    (Publisher.findById as jest.Mock).mockResolvedValueOnce(true);

    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };


    (Book.prototype.save as jest.Mock).mockResolvedValueOnce(req.body);

    await addBook(req.body, next);

    expect(Book.prototype.save).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled(); 
  });
  jest.resetAllMocks()
  jest.clearAllMocks()

  it('should throw an error if author does not exist', async () => {
    (Book.findOne as jest.Mock).mockResolvedValueOnce(null);//book does not exist
    (Author.findById as jest.Mock).mockResolvedValueOnce(null); //Author does not exist
    (Publisher.findById as jest.Mock).mockResolvedValueOnce(true); // Publisher exists

    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };
    
    await addBook(req, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Author not found');
  
  });
});

describe('updateBook', () => { 
  let req: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {} };
    next = jest.fn(); 
    jest.clearAllMocks(); 
    jest.resetAllMocks()

  });

  it('should throw an error if book does not exist', async () => {
    req.params = { id: '1' };
    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };
    
    (Book.findById as jest.Mock).mockResolvedValueOnce(null); //book does not exist
    (Author.findById as jest.Mock).mockResolvedValueOnce(true); //author exists
    (Publisher.findById as jest.Mock).mockResolvedValueOnce(true); //publisher exists

    await updateBook(req, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Book not found');
  });

  jest.clearAllMocks()
  it('should throw an error if author does not exist', async () => {
    req.params = { id: '1' };
    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };
    
    (Book.findById as jest.Mock).mockResolvedValueOnce(true); // Book exists
    (Author.findById as jest.Mock).mockResolvedValueOnce(null); // Author does not exist
    (Publisher.findById as jest.Mock).mockResolvedValueOnce(true); // publisher exists

    await updateBook(req, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Author not found');
  });

  jest.clearAllMocks()
  it('should throw an error if publisher does not exist', async () => {
    req.params = { id: '1' };
    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };
    
    (Book.findById as jest.Mock).mockResolvedValueOnce(true); //Book exists
    (Author.findById as jest.Mock).mockResolvedValueOnce(true); // Author exists
    (Publisher.findById as jest.Mock).mockResolvedValueOnce(null); // Publisher does not exist

    await updateBook(req, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Publisher not found');
  }
  );
  jest.clearAllMocks()
 it('should throw an error if ISBN already exists', async () => {
  req.params = { id: '1' };
  req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };

  (Book.findById as jest.Mock).mockResolvedValueOnce(true); //book exists
  (Author.findById as jest.Mock).mockResolvedValueOnce(true); // Author exists
  (Publisher.findById as jest.Mock).mockResolvedValueOnce(true); // Publisher exists
  (Book.findOne as jest.Mock).mockResolvedValueOnce(true); // ISBN already exists

  await updateBook(req, next);

  expect(next).toHaveBeenCalledWith(expect.any(CustomError));
  expect(next.mock.calls[0][0].message).toBe('Book already exists');
}
);


  it('should update a book successfully', async () => {
    req.params = { id: '1' };
    req.body = { title: 'Test Book', authorId: '1', price: 10, ISBN: '123456', language: 'English', pages: 300, publisherId: '2' };
    
    (Book.findById as jest.Mock).mockResolvedValueOnce(true); //book exists
    (Author.findById as jest.Mock).mockResolvedValueOnce(true); // Author exists
    (Publisher.findById as jest.Mock).mockResolvedValueOnce(true); // Publisher exists
    (Book.findOne as jest.Mock).mockResolvedValueOnce(null); // ISBN does not exist

    (Book.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(req.body);

    await updateBook(req, next);

    expect(Book.findByIdAndUpdate).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled(); 
  });
  
}
);


describe('deleteBook', () => {
  let req: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { params: {} };
    next = jest.fn();
    jest.clearAllMocks(); 
    jest.resetAllMocks(); 
  });

  it('should throw an error if book does not exist', async () => {
    req.params = { id: '1' };
    
    (Book.findById as jest.Mock).mockResolvedValueOnce(null); // book does not exist
    
    await deleteBook(req, next); // call deleteBook
  
    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Book not found');
  });

  it('should delete a book successfully', async () => {
    req.params = { id: '1' };

    (Book.findById as jest.Mock).mockResolvedValueOnce(true); // book exists
    (Book.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(true); // delete successful
    
    await deleteBook(req.params.id, next); //call deleteBook

    // check if the book is deleted
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(next).not.toHaveBeenCalled(); // check if next is not called
  });
});

describe('getOneBook', () => {    
  let req: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { params: {} };
    next = jest.fn();
    jest.clearAllMocks(); 
    jest.resetAllMocks(); 
  });

  it('should throw an error if book does not exist', async () => {
    req.params = { id: '1' };
    
    (Book.findById as jest.Mock).mockReturnValueOnce(null);
    
    await getOneBook(req.params.id, next); // call getOneBook with req.params.id
  
    expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // Should call next with error
    expect(next.mock.calls[0][0].message).toBe('Book not found');
  });

  it('should return a book successfully', async () => {
    req.params = { id: '1' };

    const mockBook = { title: 'Test Book', authorId: '1', publisherId: '2' };

    (Book.findById as jest.Mock).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce(mockBook), // populate authorId and publisherId 
    });


    const result = await getOneBook(req.params.id, next); // call getOneBook

    // Check if the book is returned
    expect(Book.findById).toHaveBeenCalledWith(req.params.id);
    expect(next).not.toHaveBeenCalled(); // Check if next is not called
    expect(result).toEqual(mockBook); // Check if the returned value is correct
  });
});

describe('getAllBooks', () => {
  let next: jest.Mock;
  let req: Request & { query: { title?: string; authorId?: string; publisherId?: string; language? : string; sortBy?: string; sortOrder?: string } }; // Type assertion 

  beforeEach(() => {
    req = { query: {} } as Request & { query: { title?: string; authorId?: string; publisherId?: string;language? : string; sortBy?: string; sortOrder?: string } }; // Type assertion
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return filtered and sorted books successfully', async () => {
    const mockBooks = [
      { title: 'Harry Potter', authorId: '1' },
      { title: 'The Hobbit', authorId: '2' },
    ];

    const mockFind = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockResolvedValue(mockBooks),
    };

    (Book.find as jest.Mock).mockReturnValue(mockFind);
    (Book.countDocuments as jest.Mock).mockResolvedValue(2);

    req.query = { title: 'Harry', sortBy: 'title', sortOrder: 'asc' };

    

    const result = await getAllBooks(1, 2, next, req.query);

    expect(Book.find).toHaveBeenCalled();
    expect(mockFind.skip).toHaveBeenCalledWith(0);
    expect(mockFind.limit).toHaveBeenCalledWith(2);
    expect(mockFind.sort).toHaveBeenCalledWith({ title: 1 }); // Ascending order
    expect(mockFind.populate).toHaveBeenCalledWith(['authorId', 'publisherId']);
    expect(result).toEqual({
      books: mockBooks,
      totalBooks: 2,
      currentPage: 1,
      totalPages: 1,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw an error if no books are found', async () => {
    const mockFind = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockResolvedValue([]), // No books found
    };

    (Book.find as jest.Mock).mockReturnValue(mockFind);
    (Book.countDocuments as jest.Mock).mockResolvedValue(0); // 0 books found

    await getAllBooks(1, 2, next, req.query);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // should call next with error
    expect(next.mock.calls[0][0].message).toBe('No books found');
  });
});





