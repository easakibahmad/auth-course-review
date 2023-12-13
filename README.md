# l2b2a3-course-review-easakibahmad

# Project setup

1. npm init -y (npm initialization)
2. npm install mongoose --save (mongoose installation)
3. npm i express (express installation)  
   npm i --save-dev @types/express
4. npm install -D typescript (typescript installation)  
   tsc --init  
   rootDir and outDir setup
5. npm i dotenv (dotenv installation)
6. npm i cors (cors installation)  
   npm i @types/cors
7. npm i ts-node-dev --save-dev (for run app when developing)
8. mongodb connection (database connection)
9. npm i zod (zod validator installation)
10. npm i http-status (for http-status code)
11. eslint installation

# To run application locally

1. npm run build (for build)
2. npm run start (that can start the project)
3. npm run start:dev (development purpose)
4. npm run start:prod (production purpose)
5. This information is from my package.json file. You can clearly understand it by reviewing this:  
   {  
   "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",  
    "build": "tsc",  
    "start": "node ./dist/server.js",  
    "start:prod": "node ./dist/server.js",  
   }

# API Endpoints:

1. Endpoint: /api/course  
   Method: POST  
   for creating a Course
2. Endpoint: /api/courses  
   Method: GET  
   Get Paginated and Filtered Courses by utilizing query parameters
3. Endpoint: /api/categories  
   Method: POST  
   for creating a Category
4. Endpoint: /api/categories  
   Method: GET  
   Get All Categories
5. Endpoint: /api/reviews  
   Method: POST  
   for creating a Review
6. Endpoint: /api/courses/:courseId  
   Method: PUT  
   Update a Course (Partial Update with Dynamic Update)
7. Endpoint: /api/courses/:courseId/reviews  
   Method: GET  
   Get Course by ID with Reviews
8. Endpoint: /api/course/best  
   Method: GET  
   Get the Best Course Based on Average Review (Rating)

# Error handling

1. Implemented CastError, DuplicateError, ValidationError, ZodValidationError separately
2. Custom AppError handler created
3. Also created global error handler
4. NotFoundRoute implemented
5. For validating request created ValidateRequest.ts file

# Utils

1. CatchAsync.ts file created for reduce repeated try-catch block as a RequestHandler
2. Implemented SendResponse for each api

# Routes

1. course routes used directly in app.ts file
2. others routes (review, category) are customized inside index.ts file in routes folder

# Vercel deploy

1. npm i -g vercel (install vercel)
2. locally build (npm run build)
3. create vercel.json file in root directory
4. vercel login (run this command in terminal)
5. vercel (run this command in terminal and answer carefully the questions)
6. set env variables
7. after app modification(run below commands in terminal)  
   npm run build  
   vercel --prod
