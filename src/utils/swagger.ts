// **************** BOOK ENDPOINTS **************** //
// 1. POST /books/add
/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a new book
 *     description: Creates a new book.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Great Gatsby
 *               authorId:
 *                 type: string
 *                 example: 603d2b7f8f1f4d1a8836f77a
 *               price:
 *                 type: number
 *                 example: 15.99
 *               ISBN:
 *                 type: string
 *                 example: 978-3-16-148410-0
 *               language:
 *                 type: string
 *                 example: English
 *               pages:
 *                 type: integer
 *                 example: 180
 *               publisherId:
 *                 type: string
 *                 example: 603d2b7f8f1f4d1a8836f77b
 *     responses:
 *       201:
 *         description: Book successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77c
 *                 title:
 *                   type: string
 *                   example: The Great Gatsby
 *                 authorId:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 price:
 *                   type: number
 *                   example: 15.99
 *                 ISBN:
 *                   type: string
 *                   example: 978-3-16-148410-0
 *                 language:
 *                   type: string
 *                   example: English
 *                 pages:
 *                   type: integer
 *                   example: 180
 *                 publisherId:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77b
 */

// 2. PUT /books/update{id}
/**
 * @swagger
 * /books/update/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: Updates a book based on the provided ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Great Gatsby
 *               authorId:
 *                 type: string
 *                 example: 603d2b7f8f1f4d1a8836f77a
 *               price:
 *                 type: number
 *                 example: 15.99
 *               ISBN:
 *                 type: string
 *                 example: 978-3-16-148410-0
 *               language:
 *                 type: string
 *                 example: English
 *               pages:
 *                 type: integer
 *                 example: 180
 *               publisherId:
 *                 type: string
 *                 example: 603d2b7f8f1f4d1a8836f77b
 *     responses:
 *       200:
 *         description: Book successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77c
 *                 title:
 *                   type: string
 *                   example: The Great Gatsby
 *                 authorId:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 price:
 *                   type: number
 *                   example: 15.99
 *                 ISBN:
 *                   type: string
 *                   example: 978-3-16-148410-0
 *                 language:
 *                   type: string
 *                   example: English
 *                 pages:
 *                   type: integer
 *                   example: 180
 *                 publisherId:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77b
 */

// 3. DELETE /books/delete/{id}
/**
 * @swagger
 * /books/delete/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a book based on the provided ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77c
 *     responses:
 *       200:
 *         description: Book successfully deleted.
 */

// 4. GET /books
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves a list of all books.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: title
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: authorId
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: language
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: publisherId
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: sortBy
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: price
 *       - name: sortOrder
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: asc
 *     responses:
 *       200:
 *         description: Books successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 603d2b7f8f1f4d1a8836f77c
 *                   title:
 *                     type: string
 *                     example: The Great Gatsby
 *                   authorId:
 *                     type: string
 *                     example: 603d2b7f8f1f4d1a8836f77a
 *                   price:
 *                     type: number
 *                     example: 15.99
 *                   ISBN:
 *                     type: string
 *                     example: 978-3-16-148410-0
 *                   language:
 *                     type: string
 *                     example: English
 *                   pages:
 *                     type: integer
 *                     example: 180
 *                   publisherId:
 *                     type: string
 *                     example: 603d2b7f8f1f4d1a8836f77b
 */

// 5. GET /books/{id}
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a specific book
 *     description: Retrieves a book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77c
 *     responses:
 *       200:
 *         description: Book successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77c
 *                 title:
 *                   type: string
 *                   example: The Great Gatsby
 *                 authorId:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 price:
 *                   type: number
 *                   example: 15.99
 *                 ISBN:
 *                   type: string
 *                   example: 978-3-16-148410-0
 *                 language:
 *                   type: string
 *                   example: English
 *                 pages:
 *                   type: integer
 *                   example: 180
 *                 publisherId:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77b
 *       404:
 *         description: Book not found.
 */


// **************** AUTHOR ENDPOINTS **************** //
// 1. POST /authors/add
/**
 * @swagger
 * /authors/add:
 *   post:
 *     summary: Add a new author
 *     description: Creates a new author.
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               country:
 *                 type: string
 *                 example: USA
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: Author successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 country:
 *                   type: string
 *                   example: USA
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: 1980-01-01
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: johndoe@example.com
 */

// 2. PUT /authors/update/{id}
/**
 * @swagger
 * /authors/update/{id}:
 *   put:
 *     summary: Update an existing author
 *     description: Updates an author based on the provided ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Smith
 *               country:
 *                 type: string
 *                 example: UK
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1985-05-15
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johnsmith@example.com
 *     responses:
 *       200:
 *         description: Author successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 name:
 *                   type: string
 *                   example: John Smith
 *                 country:
 *                   type: string
 *                   example: UK
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: 1985-05-15
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: johnsmith@example.com
 */

// 3. DELETE /authors/delete/{id}
/**
 * @swagger
 * /authors/delete/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author based on the provided ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77a
 *     responses:
 *       200:
 *         description: Author successfully deleted.
 */

// 4. GET /authors
/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Retrieves a list of all authors.
 *     tags:
 *       - Authors
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: country
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: email
 *       - name: sortBy
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: name
 *       - name: sortOrder
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: asc
 *     responses:
 *       200:
 *         description: Authors successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 603d2b7f8f1f4d1a8836f77a
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   country:
 *                     type: string
 *                     example: USA
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                     example: 1980-01-01
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: johndoe@example.com
 */

// 5. GET /authors/{id}
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get a specific author
 *     description: Retrieves an author by their ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77a
 *     responses:
 *       200:
 *         description: Author successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 country:
 *                   type: string
 *                   example: USA
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: 1980-01-01
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: johndoe@example.com
 *       404:
 *         description: Author not found.
 */



// **************** PUBLISHER ENDPOINTS **************** //
// 1. POST /publishers/add
/**
 * @swagger
 * /publishers/add:
 *   post:
 *     summary: Add a new publisher
 *     description: Creates a new publisher.
 *     tags:
 *       - Publishers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Penguin Books
 *               phone:
 *                 type: string
 *                 example: +1-234-567-890
 *               address:
 *                 type: string
 *                 example: 123 Book Street, NY, USA
 *               email:
 *                 type: string
 *                 format: email
 *                 example: contact@penguin.com
 *     responses:
 *       200:
 *         description: Publisher successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 name:
 *                   type: string
 *                   example: Penguin Books
 *                 phone:
 *                   type: string
 *                   example: +1-234-567-890
 *                 address:
 *                   type: string
 *                   example: 123 Book Street, NY, USA
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: contact@penguin.com
 */

// 2. PUT /publishers/update/{id}
/**
 * @swagger
 * /publishers/update/{id}:
 *   put:
 *     summary: Update an existing publisher
 *     description: Updates a publisher based on the provided ID.
 *     tags:
 *       - Publishers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Penguin Books
 *               phone:
 *                 type: string
 *                 example: +1-234-567-890
 *               address:
 *                 type: string
 *                 example: 123 Book Street, NY, USA
 *               email:
 *                 type: string
 *                 format: email
 *                 example: contact@penguin.com
 *     responses:
 *       200:
 *         description: Publisher successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 name:
 *                   type: string
 *                   example: Penguin Books
 *                 phone:
 *                   type: string
 *                   example: +1-234-567-890
 *                 address:
 *                   type: string
 *                   example: 123 Book Street, NY, USA
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: contact@penguin.com
 */

// 3. DELETE /publishers/delete/{id}
/**
 * @swagger
 * /publishers/delete/{id}:
 *   delete:
 *     summary: Delete a publisher
 *     description: Deletes a publisher based on the provided ID.
 *     tags:
 *       - Publishers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77a
 *     responses:
 *       200:
 *         description: Publisher successfully deleted.
 */

// 4. GET /publishers
/**
 * @swagger
 * /publishers:
 *   get:
 *     summary: Get all publishers
 *     description: Retrieves a list of all publishers.
 *     tags:
 *       - Publishers
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Publishers successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 603d2b7f8f1f4d1a8836f77a
 *                   name:
 *                     type: string
 *                     example: Penguin Books
 *                   phone:
 *                     type: string
 *                     example: +1-234-567-890
 *                   address:
 *                     type: string
 *                     example: 123 Book Street, NY, USA
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: contact@penguin.com
 */

// 5. GET /publishers/{id}
/**
 * @swagger
 * /publishers/{id}:
 *   get:
 *     summary: Get a specific publisher
 *     description: Retrieves a publisher by its ID.
 *     tags:
 *       - Publishers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 603d2b7f8f1f4d1a8836f77a
 *     responses:
 *       200:
 *         description: Publisher successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 603d2b7f8f1f4d1a8836f77a
 *                 name:
 *                   type: string
 *                   example: Penguin Books
 *                 phone:
 *                   type: string
 *                   example: +1-234-567-890
 *                 address:
 *                   type: string
 *                   example: 123 Book Street, NY, USA
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: contact@penguin.com
 *       404:
 *         description: Publisher not found.
 */