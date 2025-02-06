// ./src/app.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Routes
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoriesRoutes.js';
import productRoutes from './routes/productRoutes.js';
import movementRoutes from './routes/movementRoutes.js';

// Configuracion
dotenv.config();
const app = express();
app.use(express.json());

// Configurar CORS
const allowedOrigin = [
  'http://localhost:3001', // React local
  'http://localhost:3000', // React local
  'http://127.0.0.1:3001', // Alternativa local
  'http://localhost:4000', // Swagger UI u otro puerto
  process.env.CLIENT_URL, // URL en producción
];

app.use(
  cors({
    origin: "*",
    methods: 'GET,POST,PUT,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Content-Disposition',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
    ],
  })
);

// Swagger
import setupSwaggerV1 from '../swagger/v1/main.js';
setupSwaggerV1(app);

// Morgan
import morgan from 'morgan';
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', movementRoutes);

export default app;
