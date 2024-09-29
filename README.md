# Book Management System

This is a **Book Management System** built using **Node.js**, **TypeScript**, **Express**, and **MongoDB**. The system allows users to manage books, including adding, retrieving, updating, and deleting book records. It also supports pagination, filtering, and sorting functionalities.

###

 <img align="right" src="https://github.com/user-attachments/assets/e08dbafe-e527-43af-bdc9-c744ef7dc662" alt="image" height="280px"/>


###

<h3 align="left">Table of Content</h3>


- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Documentation](#documentation)
- [Contact](#contact)



###

## Features

- **CRUD operations** for managing books, authors and publishers
- **Pagination**: Ability to paginate through books, authors and publishers.
- **Filtering**: Filter books and authors table by certain fields (author, title, email, etc.). 
- **Sorting**: Sort books, authors and publishers by any field.
- **Error Handling**: Custom error handling for various operations.

## Technologies Used

- [**Node.js**](https://nodejs.org/en): JavaScript runtime for building server-side applications.
- [**TypeScript**](https://www.typescriptlang.org/): Superset of JavaScript for better type safety and developer experience.
- [**Express**](https://expressjs.com/): Web framework for Node.js.
- [**MongoDB**](https://www.mongodb.com/): NoSQL database for storing book records.
- [**Mongoose**](https://mongoosejs.com/): ODM (Object Data Modeling) library for MongoDB and Node.js.
- [**Jest**](https://jestjs.io/): Testing framework.
- [**Docker**](https://www.docker.com/): For containerizing the application.

## Installation

Follow the steps below to install and set up the project on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker**: Make sure Docker is installed on your machine. You can download it from the [official Docker website](https://www.docker.com/get-started).
- **Docker Compose**: This project uses Docker Compose for managing multi-container applications. Ensure it is installed alongside Docker.


1. **Clone the repository**:
   ```bash
   git clone https://github.com/bygt/book-management-system.git

2. **Navigate into the project directory**:
    ```bash
   cd book-managament-system
    
3. **Install dependencies:**
    ```bash
   npm install

4. **Set up environment variables and Docker-Compose.yml Mongo URI**
    ```bash
    MONGO_URI=your-mongodb-uri    

5. **Build the docker image**:
    ```bash
   docker-compose build

## Runnig the Application

6. **Run the development server with Docker:** 🐋
   ```bash
   docker-compose up
   
2. **Using npm: If you prefer to run the application without Docker, you can also use**
    ```bash
   npm run dev

### Accessing the Application

After the application is running, you can access it by navigating to http://localhost:*port* in your web browser, where *port* is the port specified in your docker-compose.yml file (e.g., http://localhost:3000).

## Project Structure
Here’s a basic overview of the project's file structure:
> ├── src # Main source code for the application.  
> │   ├── controllers # Contains controller files for handling requests  
> │   ├── models # Database schemas and models defined using Mongoose.  
> │   ├── routes # Defines the endpoints (API routes) for the app.  
> │   ├── services # Handles the business logic (e.g., fetching data, processing).  
> │   ├── utils # Utility functions  
> │   ├── middlewares # Contains middleware functions like error handling  
> │   ├── tests # Contains unit test files  
> │   └── index.ts # Entry point for the application  
> ├── .env # Environment variables  
> ├── .gitignore # Files to be ignored by Git  
> ├── Dockerfile # Instructions to create a Docker image for this app.  
> ├── package.json # Project metadata and dependencies  
> ├── tsconfig.json # TypeScript configuration  
> └── README.md # Project documentation


## Running Tests
To run the test suite, execute the following command:
  ```bash
   npm test
 ```

## API Endpoints

### Book CRUD Operations 📖

- GET /books?page=&limit=&sortBy=&sortOrder= - Get paginated list of books with sorting and filtering including book's author and publisher info.

  Example:
  ```bash
  GET /books?page=1&limit=2&title=Harry&sortBy=title&sortOrder=asc
 
- GET /books/:id - Get details of a single book by ID.

  Example: 
   ```bash
  GET /books/66f5b21139a2dafb9a2f475b
  
- PUT /books/:id - Update an existing book by ID.

  Example:
   ```bash
  PUT /books/66f5b21139a2dafb9a2f475b
   
- DELETE /books/:id - Delete a book by ID.

  Example:
  ```bash
  DEL /books/66f5b21139a2dafb9a2f475b

- POST /books/add - Add a new book with Request data.

  ❗**NOTE** :Books can only be added using the IDs of authors and publishers that already exist in the database. Therefore, it is required to add authors and       publishers first before adding a book.*

***


### Author CRUD Operations 🤓

- GET /authors?page=&limit=&sortBy=&sortOrder= - Get paginated list of authors with sorting and filtering.

  Example:
  ```bash
  GET /authors?page=1&limit=2&name=John&sortBy=title&sortOrder=asc
 
- GET /authors/:id - Get details of a single author by ID.

  Example: 
   ```bash
  GET /authors/66f5b21139a2dafb9a2f475b
  
- PUT /authors/:id - Update an existing author by ID.

  Example:
   ```bash
  PUT /authors/66f5b21139a2dafb9a2f475b
   
- DELETE /authors/:id - Delete a author by ID.

  Example:
  ```bash
  DEL /authors/66f5b21139a2dafb9a2f475b

- POST /authors/add - Add a new author with Request data.

***


### Publishers 🖊️

- GET /publishers - Get list of all publishers.

  Example:
  ```bash
  GET /publishers?page=1&limit=2&name=John&sortBy=title&sortOrder=asc
 
- GET /publishers/:id - Get details of a single publisher by ID.

  Example: 
   ```bash
  GET /publishers/66f5b21139a2dafb9a2f475b
  
- PUT /publishers/:id - Update an existing publisher by ID.

  Example:
   ```bash
  PUT /publishers/66f5b21139a2dafb9a2f475b
   
- DELETE /publishers/:id - Delete a publisher by ID.

  Example:
  ```bash
  DEL /publishers/66f5b21139a2dafb9a2f475b

- POST /publishers/add - Add a new publisher with Request data.

## Documentation
 
 Swagger Setup: This project uses Swagger to generate API documentation. The setup can be found in the `swagger.ts` file. 
 
 Accessing the Documentation: After running the application, the API documentation is accessible at:
 ```bash
 http://localhost:3000/api-docs
 ```
All API endpoints, request bodies, and response structures are documented. You can make requests directly from the UI to see responses and debug the API easily.

## Contact
For questions or feedback, please reach out to:
- *GitHub*: [Buse Yiğit](https://github.com/bygt)
- *LinkedIn*: [Buse Yiğit](https://www.linkedin.com/in/buse-yigit/)
- *Email*: [buseyigit01@gmail.com](mailto:buseyigit01@gmail.com)
- *Repository*: [GitHub Repository](https://github.com/bygt/book-managament-system)
