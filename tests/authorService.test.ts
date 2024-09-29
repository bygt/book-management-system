import {
	getAllAuthors,
	addAuthor,
	deleteAuthor,
	updateAuthor,
	getOneAuthor,
} from "../src/services/authorService"; 
import Author from "../src/models/authorModel"; 
import { CustomError } from "../src/utils/customError";
import { Request } from "express";
import Book from "../src/models/bookModel";

jest.mock("../src/models/authorModel"); // mock the author model
jest.mock("../src/models/bookModel"); // mock the book model

describe("addAuthor", () => {
	let next: jest.Mock;
	let req: Request & {
		body: { name: string; country: string; birthDate: Date; email: string };
	};

	beforeEach(() => {
		req = { body: {} } as Request & {
			body: { name: string; country: string; birthDate: Date; email: string };
		};
		next = jest.fn();
		jest.clearAllMocks();
	});

	it("should add an author successfully", async () => {
		req.body = {
			name: "Author One",
			country: "Country A",
			birthDate: new Date(),
			email: "author@a.com",
		};
		const mockAuthor = new Author(req.body);
		(Author.findOne as jest.Mock).mockResolvedValue(null); // author not found
		(Author.prototype.save as jest.Mock).mockResolvedValue(mockAuthor); // save the author

		const result = await addAuthor(req, next);

		expect(Author.findOne).toHaveBeenCalled();
		expect(Author.prototype.save).toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
		expect(result?.name).toEqual(mockAuthor.name);
		expect(result?.country).toEqual(mockAuthor.country);
	});

	it("should throw an error if all fields are not provided", async () => {
		req.body = {
			name: "Author One",
			// country is missing
			birthDate: new Date(),
			email: "mai@m.com",
		};

		await addAuthor(req, next);

		expect(next).toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(expect.any(CustomError));
		expect(next.mock.calls[0][0].message).toBe("All fields are required");
	});

	it("should throw an error if email format is invalid", async () => {
		req.body = {
			name: "Author One",
			country: "Country A",
			birthDate: new Date(),
			email: "invalid mail", // Invalid email format
		};
		const mockAuthor = new Author(req.body);
		(Author.findOne as jest.Mock).mockResolvedValue(null); // author does not exist
		(Author.prototype.save as jest.Mock).mockResolvedValue(mockAuthor); // save the author

		await addAuthor(req, next);

		expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // must call next with an error
		expect(next.mock.calls[0][0].message).toBe("Invalid email format"); // Error message must be 'Invalid email format'
	});

	it("should throw an error if author already exists", async () => {
		req.body = {
			name: "Author One",
			country: "Country A",
			birthDate: new Date(),
			email: "author@f.com",
		};
		const mockAuthor = new Author(req.body);
		(Author.findOne as jest.Mock).mockResolvedValue(mockAuthor); // found an author with the same email

		await addAuthor(req, next);

		expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // must call next with an error
		expect(next.mock.calls[0][0].message).toBe("Author already exists");
	});
});

describe("deleteAuthor", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: jest.Mock;

	beforeEach(() => {
		req = { params: { id: "someAuthorId" } };
		res = {};
		next = jest.fn();
	});

	it("should delete author if found and has no books", async () => {
		const mockAuthor = { _id: "someAuthorId", name: "Author One" };
		(Author.findById as jest.Mock).mockResolvedValue(mockAuthor); // Mock author found
		(Book.findOne as jest.Mock).mockResolvedValue(null); // Mock no books found for author
		(Author.findByIdAndDelete as jest.Mock).mockResolvedValue(mockAuthor); // Mock successful deletion

		const result = await deleteAuthor(req as Request, next);

		expect(Author.findById).toHaveBeenCalledWith(req.params?.id);
		expect(Book.findOne).toHaveBeenCalledWith({ authorId: req.params?.id });
		expect(Author.findByIdAndDelete).toHaveBeenCalledWith(req.params?.id);
		expect(next).not.toHaveBeenCalled(); // next should not be called
	});

	it("should throw an error if author not found", async () => {
		(Author.findById as jest.Mock).mockResolvedValue(null); // Mock author not found

		await deleteAuthor(req as Request, next);

		expect(next).toHaveBeenCalledWith(expect.any(CustomError));
		expect(next.mock.calls[0][0].message).toBe("Author not found");
	});

	it("should throw an error if author has books", async () => {
		const mockAuthor = { _id: "someAuthorId", name: "Author One" };
		(Author.findById as jest.Mock).mockResolvedValue(mockAuthor); // Mock author found
		(Book.findOne as jest.Mock).mockResolvedValue({}); // Mock books found for author

		await deleteAuthor(req as Request, next);

		expect(next).toHaveBeenCalledWith(expect.any(CustomError));
		expect(next.mock.calls[0][0].message).toBe("Author has books");
	});
});

describe("getAllAuthors", () => {
	let next: jest.Mock;
	let req: Request & {
		query: {
			name?: string;
			country?: string;
			birthDate?: string;
			email?: string;
			sortBy?: string;
			sortOrder?: string;
		};
	};

	beforeEach(() => {
		req = { query: {} } as Request & {
			query: {
				name?: string;
				country?: string;
				birthDate?: string;
				email?: string;
				sortBy?: string;
				sortOrder?: string;
			};
		};
		next = jest.fn();
		jest.clearAllMocks();
	});

	it("should return filtered and sorted authors successfully", async () => {
		const mockAuthors = [
			{ name: "Author One", country: "Country A" },
			{ name: "Author Two", country: "Country B" },
		];

		const mockFind = {
			skip: jest.fn().mockReturnThis(),
			limit: jest.fn().mockReturnThis(),
			sort: jest.fn().mockReturnValue(mockAuthors), 
		};

		(Author.find as jest.Mock).mockReturnValue(mockFind); 
		(Author.countDocuments as jest.Mock).mockResolvedValue(2); 

		req.query = { name: "Author", sortBy: "name", sortOrder: "asc" };

		const result = await getAllAuthors(1, 2, next, req.query);

		expect(Author.find).toHaveBeenCalled();
		expect(mockFind.skip).toHaveBeenCalledWith(0);
		expect(mockFind.limit).toHaveBeenCalledWith(2);
		expect(mockFind.sort).toHaveBeenCalledWith({ name: 1 }); // Ascending order
		expect(result).toEqual({
			authors: mockAuthors, 
			totalAuthors: 2,
			currentPage: 1,
			totalPages: 1,
		});
		expect(next).not.toHaveBeenCalled();
	});

	it("should throw an error if no authors are found", async () => {
		const mockFind = {
			skip: jest.fn().mockReturnThis(),
			limit: jest.fn().mockReturnThis(),
			sort: jest.fn().mockReturnValue([]), // Boş dizi döndür
		};

		(Author.find as jest.Mock).mockReturnValue(mockFind);
		(Author.countDocuments as jest.Mock).mockResolvedValue(0); // 0 yazar var

		await getAllAuthors(1, 2, next, req.query);

		expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // Hata ile next çağrılmalı
		expect(next.mock.calls[0][0].message).toBe("No authors found");
	});
});


describe('updateAuthor', () => {
  let req: Partial<Request>;
  let next: jest.Mock; 

  beforeEach(() => {
    req = {
      params: { id: '123' }, 
      body: {
        name: 'Updated Author',
        country: 'Updated Country',
        birthDate: new Date(),
        email: 'updated@example.com',
      },
    };
    next = jest.fn(); 
  });

  it('should throw an error if author not found', async () => {
    (Author.findById as jest.Mock).mockResolvedValue(null); // author not found by id

    await updateAuthor(req as Request, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Author not found');
  });

  it('should throw an error if email is already taken', async () => {
    (Author.findById as jest.Mock).mockResolvedValue({ id: '123' }); // author exists
    (Author.findOne as jest.Mock).mockResolvedValue({ id: '456', email: 'updated@example.com' }); // email already taken

    await updateAuthor(req as Request, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Email already taken');
  });

  it('should update the author successfully', async () => {

    (Author.findById as jest.Mock).mockResolvedValue({ id: '123', name: 'Old Name', country: 'Old Country', birthDate: new Date(), email: 'old@example.com' }); // author exists

    (Author.findOne as jest.Mock).mockResolvedValue(null); // email is unique
    (Author.findByIdAndUpdate as jest.Mock).mockResolvedValue(true); // update is successful

    await updateAuthor(req as Request, next);

	expect(Author.findByIdAndUpdate).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled(); 
  });
});


describe('getOneAuthor', () => {
	let req: Partial<Request>;
	let next: jest.Mock; 
  
	beforeEach(() => {
	  req = {
		params: { id: '123' }, 
	  };
	  next = jest.fn(); 
	});
  
	it('should throw an error if author not found', async () => {
	  (Author.findById as jest.Mock).mockResolvedValue(null); // Publisher does not exist
  
	  await getOneAuthor(req as Request, next);
  
	  expect(next).toHaveBeenCalledWith(expect.any(CustomError));
	  expect(next.mock.calls[0][0].message).toBe('Author not found');
	});
  
	it('should return the author successfully', async () => {
	  const mockAuthor = { id: '123', name: 'Author One', country: 'Country A' }; 
	  (Author.findById as jest.Mock).mockResolvedValue(mockAuthor); 
  
	  const result = await getOneAuthor(req as Request, next);
  
	  expect(result).toEqual(mockAuthor); 
	  expect(next).not.toHaveBeenCalled(); 
	});
  });


