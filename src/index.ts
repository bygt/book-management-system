  import express, {Application, Request, Response}from 'express';
  import bookRoutes from './routes/bookRoutes';
  import authorRoutes from './routes/authorRoutes';
  import errorHandler from './middleware/errorHandler';
  import connectDB from './config/database';
  import dotenv from 'dotenv';
  import publisherRoutes from './routes/publisherRoutes';
  import cors from 'cors';
  import swaggerUi from 'swagger-ui-express';
  import path from 'path';
  import fs from 'fs';

  
  dotenv.config();
  const app : Application= express();
  const port = Number(process.env.PORT) || 3000;
  
  connectDB();
  
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
  app.use(express.json()); 

  app.use("/books", bookRoutes);
  app.use('/authors', authorRoutes);
  app.use('/publishers', publisherRoutes);


  const swaggerData = JSON.parse(fs.readFileSync(path.join(__dirname, './utils/swagger.json'), 'utf8'));
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerData));
  
  //should be the last middleware bc it handles errors
  app.use(errorHandler);

  app.get('/', (req : Request, res: Response) => {
    res.send('Welcome to the Book Managament API');
  });

  app.listen(port, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
  });

  

  