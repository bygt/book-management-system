import {
  addPublisher,
  updatePublisher,
  getOnePublisher,
  getAllPublisher,
  deletePublisher,
} from "./../src/services/publisherService";
import { CustomError } from "../src/utils/customError";
import Book from "../src/models/bookModel";
import Publisher, { IPublisher } from "../src/models/publisherModel";
import { Request } from "express";

jest.mock('../src/models/publisherModel'); // Mock Publisher model
jest.mock('../src/models/bookModel'); // Mock Book model


// 4/4 tests passed
describe("addPublisher", () => {
  let next: jest.Mock;
  let req: Request & {
    body: { name: string; phone: string; address: string; email: string };
  };

  beforeEach(() => {
    req = { body: {} } as Request & {
      body: { name: string; phone: string; address: string; email: string };
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should throw an error if publisher already exists", async () => {

    const mockPublisher = {
        name: "Test Publisher",
        phone: "54399748309",
        address: "İzmir",
        email: "test@test.com",
      };

    
    (Publisher.findOne as jest.Mock).mockResolvedValue(mockPublisher);

    await addPublisher(mockPublisher, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // Error should be passed to next
    expect(next.mock.calls[0][0].message).toBe("Publisher already exists"); // check the error message
  });

  it('should throw an error if all fields are not provided', async () => {

    const incompletePublisher = {
      name: 'Publisher One',
      phone: '1234567890', //other fields are missing
    };

    await addPublisher(incompletePublisher as IPublisher, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // Error should be passed to next
    expect(next.mock.calls[0][0].message).toBe('All fields are required'); // check the error message
  });
  it('should throw an error if email format is invalid', async () => {
    const invalidEmailPublisher = {
      name: 'Publisher Name',
      phone: '1234567890',
      address: '123 Street',
      email: 'invalid-email-format' // Invalid email format
    };

    await addPublisher(invalidEmailPublisher, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Invalid email format');
  });

  it('should add a publisher successfully', async () => {
    const validPublisher = {
      name: 'Publisher Name',
      phone: '1234567890',
      address: '123 Street',
      email: 'valid.email@example.com' 
    };
            const mockPublisher = new Publisher(req.body);
    		(Publisher.findOne as jest.Mock).mockResolvedValue(null); // author not found
    		(Publisher.prototype.save as jest.Mock).mockResolvedValue(mockPublisher); // save the author
    
    		const result = await addPublisher(validPublisher, next);
    
    		expect(Publisher.findOne).toHaveBeenCalled();// findOne should be called
    		expect(Publisher.prototype.save).toHaveBeenCalled();// save should be called
    		expect(next).not.toHaveBeenCalled(); // next should not be called
    		expect(result?.name).toEqual(mockPublisher.name); // to check if values are equal
            expect(result?.phone).toEqual(mockPublisher.phone);

    
  });
});


//4/4 tests passed
describe('updatePublisher', () => {
    let req: Partial<Request>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            params: { id: '123' }, // Mock publisher ID
            body: {
                name: 'Updated Publisher',
                phone: '1234567890',
                email: 'mail@example.com',
                address: 'Updated Address',
            },
        };
        next = jest.fn(); // Mock the next function
    });

    it('should throw an error if publisher not found', async () => {
        (Publisher.findById as jest.Mock).mockResolvedValue(null); // Mock: Publisher not found

        await updatePublisher(req as Request, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next.mock.calls[0][0].message).toBe('Publisher not found');
        expect(next.mock.calls[0][0].status).toBe(404);
    });

    it('should throw an error if email is already taken', async () => {
        const mockPublisher = { id: '123', email: 'existing@example.com' }; 
        (Publisher.findById as jest.Mock).mockResolvedValue(mockPublisher);

        const anotherPublisher = { id: '456', email: 'newtaken@example.com' }; 
        (Publisher.findOne as jest.Mock).mockResolvedValueOnce(anotherPublisher); // Mock email conflict

        req.body.email = 'newtaken@example.com'; // Set email to conflict

        await updatePublisher(req as Request, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next.mock.calls[0][0].message).toBe('Email already taken');
        expect(next.mock.calls[0][0].status).toBe(400);
    });

    it('should throw an error if phone is already taken', async () => {
        const mockPublisher = { id: '123', phone: '1234567890' };
        (Publisher.findById as jest.Mock).mockResolvedValue(mockPublisher);

        const anotherPublisherWithPhone = { id: '456', phone: '9999999999' };
        (Publisher.findOne as jest.Mock).mockResolvedValueOnce(null); // No email conflict
        (Publisher.findOne as jest.Mock).mockResolvedValueOnce(anotherPublisherWithPhone); // Mock phone conflict

        req.body.phone = '9999999999'; // Set phone to conflict

        await updatePublisher(req as Request, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next.mock.calls[0][0].message).toBe('Phone already taken');
        expect(next.mock.calls[0][0].status).toBe(400);
    });

    it('should update the publisher successfully', async () => {
        // Mock: Existing publisher found
        const existingPublisher = {
            id: '123',
            name: 'Old Publisher',
            phone: '9876543210',
            email: 'old@example.com',
            address: 'Old Address'
        };
        (Publisher.findById as jest.Mock).mockResolvedValue(existingPublisher);

        // Mock: No email or phone conflicts
        (Publisher.findOne as jest.Mock).mockResolvedValueOnce(null); // No email conflict
        (Publisher.findOne as jest.Mock).mockResolvedValueOnce(null); // No phone conflict

        // Mock: Updated publisher returned from findByIdAndUpdate
        const updatedPublisher = {
            id: '123',
            name: 'Updated Publisher',
            phone: '1234567890',
            email: 'mail@example.com',
            address: 'Updated Address'
        };
        (Publisher.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPublisher);

        // Call the service
        const result = await updatePublisher(req as Request, next);

        expect(result).toEqual(updatedPublisher); // Expect the updated publisher to be returned
        expect(next).not.toHaveBeenCalled(); // Next should not be called
    });
});


// 3/3 tests passed
describe('deletePublisher', () => {
    let req: Partial<Request>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            params: { id: '123' }, // Mock publisher ID
        };
        next = jest.fn(); // Mock the next function
    });

    it('should throw an error if publisher is not found', async () => {
        (Publisher.findById as jest.Mock).mockResolvedValue(null);

        await deletePublisher(req as Request, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next.mock.calls[0][0].message).toBe('Publisher not found');
        expect(next.mock.calls[0][0].status).toBe(404);
    });

    it('should throw an error if publisher has books', async () => {
        const mockPublisher = { id: '123', name: 'Publisher Name' };
        (Publisher.findById as jest.Mock).mockResolvedValue(mockPublisher);

        // Mock: Books associated with the publisher
        const mockBooks = [{ id: '1', title: 'Book 1', publisherId: '123' }];
        (Book.find as jest.Mock).mockResolvedValue(mockBooks); // Mock books found

        // Call the service
        await deletePublisher(req as Request, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        expect(next.mock.calls[0][0].message).toBe('Publisher has books, cannot delete');
        expect(next.mock.calls[0][0].status).toBe(400);
    });

    it('should delete the publisher successfully if no books are associated', async () => {
        const mockPublisher = { id: '123', name: 'Publisher Name' };
        (Publisher.findById as jest.Mock).mockResolvedValue(mockPublisher);

          (Book.find as jest.Mock).mockResolvedValue([]); // Mock no books

        (Publisher.findByIdAndDelete as jest.Mock).mockResolvedValue(mockPublisher);

        const result = await deletePublisher(req as Request, next);

        expect(result).toEqual(mockPublisher);
        expect(next).not.toHaveBeenCalled(); // next should not be called
    });
});


//3/3 tests passed
describe('getOnePublisher', () => {
  let req: Partial<Request>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      params: { id: '123' }, // Mock publisher ID
    };
    next = jest.fn(); 
  });

  it('should return the publisher if found', async () => {
    // Mock: Publisher found
    const mockPublisher = { id: '123', name: 'Publisher Name', email: 'test@example.com', phone: '1234567890' };
    (Publisher.findById as jest.Mock).mockResolvedValue(mockPublisher);

    // Call the service
    const result = await getOnePublisher(req as Request, next);

    expect(result).toEqual(mockPublisher);
    expect(next).not.toHaveBeenCalled(); 
  });

  it('should throw an error if publisher is not found', async () => {
    (Publisher.findById as jest.Mock).mockResolvedValue(null);

    await getOnePublisher(req as Request, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
    expect(next.mock.calls[0][0].message).toBe('Publisher not found');
    expect(next.mock.calls[0][0].status).toBe(404);
  });

  it('should throw an error if an exception occurs during the query', async () => {
    const error = new Error('Database error');
    (Publisher.findById as jest.Mock).mockRejectedValue(error);

    await getOnePublisher(req as Request, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  
});


// 4/4 tests passed
describe('getAllPublisher', () => {
  let next: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('should return publishers successfully', async () => {
    // Mock data for publishers
    const mockPublishers = [{ name: 'Publisher 1' }, { name: 'Publisher 2' }];
    
    // Mock the Publisher.find and Publisher.countDocuments methods
    (Publisher.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockPublishers), // Ensure limit is resolved with mockPublishers
    });
    (Publisher.countDocuments as jest.Mock).mockResolvedValue(mockPublishers.length);

    const result = await getAllPublisher(1, 10, next);

    expect(result).toBeDefined(); // Ensure result is defined
    expect(result?.publishers).toEqual(mockPublishers); // Ensure publishers are correctly returned
    expect(result?.totalPublisher).toBe(mockPublishers.length); // Ensure total publishers is correct
    expect(result?.currentPage).toBe(1); // Ensure current page is correct
    expect(result?.totalPages).toBe(1); // Ensure total pages is correct
    expect(next).not.toHaveBeenCalled(); // Ensure next was not called
  });

  it('should call next with an error if no publishers found', async () => {
    // Mock: No publishers found
    (Publisher.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    });
    (Publisher.countDocuments as jest.Mock).mockResolvedValue(0);

    await getAllPublisher(1, 10, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError)); // Check if next is called with an error
    expect(next.mock.calls[0][0].message).toBe('No publishers found'); // Check the error message
    expect(next.mock.calls[0][0].status).toBe(404); // Check the error status
  });

  it('should return publishers with pagination', async () => {
    const mockPublishers = Array.from({ length: 25 }, (_, i) => ({ name: `Publisher ${i + 1}` }));

    (Publisher.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockPublishers.slice(10, 20)), // Ensure it returns publishers for page 2
    });
    (Publisher.countDocuments as jest.Mock).mockResolvedValue(mockPublishers.length);

    const result = await getAllPublisher(2, 10, next); // Request page 2

    expect(result).toBeDefined(); // Ensure result is defined
    expect(result?.publishers).toEqual(mockPublishers.slice(10, 20)); // Ensure correct publishers for page 2
    expect(result?.totalPublisher).toBe(mockPublishers.length); // Ensure total publishers is correct
    expect(result?.currentPage).toBe(2); // Ensure current page is correct
    expect(result?.totalPages).toBe(3); // Ensure total pages is correct
    expect(next).not.toHaveBeenCalled(); // Ensure next was not called
  });

  it('should call next with an error if an exception occurs', async () => {
    const mockError = new Error('Database error');
    
    (Publisher.find as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    await getAllPublisher(1, 10, next);

    expect(next).toHaveBeenCalledWith(mockError); // Ensure next was called with the thrown error
  });
});





  





