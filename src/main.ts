// Import necessary modules and services
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as cookieParser from 'cookie-parser';

// Async function to bootstrap the application
async function bootstrap() {
  
  // Create a NestJS application instance
  const app = await NestFactory.create(AppModule);
  
  // Enable Cross-Origin Resource Sharing (CORS) for the specified origin, methods, and credentials
  app.enableCors({
    origin: ['http://localhost:3000'],  // Allow requests from this origin
    methods: '*',  // Allow all HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

   // Use the cookie-parser middleware to parse cookies in incoming requests
  app.use(cookieParser());

  // Get an instance of the PrismaService
  const prismaService = app.get(PrismaService);

   // Enable Prisma's shutdown hooks to properly close connections on shutdown
  await prismaService.enableShutdownHooks(app);

  // Start listening for incoming requests on port 3001
  await app.listen(3001);
}

// Call the bootstrap function to start the application
bootstrap();
