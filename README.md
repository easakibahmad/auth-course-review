# l2b2a4-course-review-with-auth-easakibahmad

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

    1. add these two lines inside tsconfig.json file  
       "include": ["src"], // which files to compile  
       "exclude": ["node_modules"], // which files to skip
    2. npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
    3. npx eslint --init
    4. add (inside eslintrc.json file)  
        "rules": {  
       "no-unused-vars": "error",  
       "no-unused-expressions": "error",  
       "prefer-const": "error",  
       "no-console": "error",  
       "no-undef": "error"  
       },  
       "globals": {  
       "process": "readonly"  
       }
    5. create .eslintignore file and add those files inside the file:  
       node_modules  
       dist

12. npm i bcrypt (bcrypt for password hashing)  
    npm i @types/bcrypt
13. npm i jsonwebtoken (jwt token)  
    npm i @types/jsonwebtoken

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

1. User Registration

- Route: [/api/auth/register](https://auth-course-review.vercel.app/api/auth/register)
- Method: POST
- Request Body:
  - example 1: admin
  ```json
  {
    "username": "adminsakib",
    "email": "adminsakib@ahmad.com",
    "password": "adminsakib58",
    "role": "admin"
  }
  ```
  - example 2: user
  ```json
  {
    "username": "usersakib",
    "email": "usersakib@ahmad.com",
    "password": "usersakib58"
  }
  ```
- Response:
  - example 1: admin
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
      "_id": "658cb0b62fdf243761f3cd2e",
      "username": "adminsakib",
      "email": "adminsakib@ahmad.com",
      "role": "admin",
      "createdAt": "2023-12-27T23:18:14.999Z",
      "updatedAt": "2023-12-27T23:18:14.999Z"
    }
  }
  ```
  - example 2: user
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
      "_id": "658cb4042a98dd7803471f5b",
      "username": "usersakib",
      "email": "usersakib@ahmad.com",
      "role": "user",
      "createdAt": "2023-12-27T23:32:20.426Z",
      "updatedAt": "2023-12-27T23:32:20.426Z"
    }
  }
  ```

1. Endpoint: /api/courses  
   Method: GET  
   Get Paginated and Filtered Courses by utilizing query parameters
2. Endpoint: /api/categories  
   Method: POST  
   for creating a Category (only admin can do this)
3. Endpoint: /api/categories  
   Method: GET  
   Get All Categories
4. Endpoint: /api/reviews  
   Method: POST  
   for creating a Review (only user can do this)
5. Endpoint: /api/courses/:courseId  
   Method: PUT  
   Update a Course (only admin can do this)
6. Endpoint: /api/courses/:courseId/reviews  
   Method: GET  
   Get Course by ID with Reviews
7. Endpoint: /api/course/best  
   Method: GET  
   Get the Best Course Based on Average Review (Rating)
8. Endpoint: /api/auth/register  
   Method: POST  
   User registration
9. Route: /api/auth/login  
   Method: POST  
   User login
10. Route: /api/auth/change-password  
    Method: POST  
    change password

# Error handling

1. Implemented CastError, DuplicateError, ValidationError, ZodValidationError separately
2. Custom AppError handler created
3. Also created global error handler
4. NotFoundRoute implemented
5. For validating request created ValidateRequest.ts file

# Authentication and Authorization

Created auth.ts file for middleware support.  
And implemented jwt authentication and authorization in this file

# Utils

1. CatchAsync.ts file created for reduce repeated try-catch block as a RequestHandler
2. Implemented SendResponse for each api

# Routes

Routes are customized inside index.ts file in routes folder and used in app.ts file

# Vercel deploy

1. npm i -g vercel (install vercel)
2. npm run build (locally build)
3. create vercel.json file in root directory
4. vercel login (run this command in terminal)
5. vercel (run this command in terminal and answer carefully the questions)
6. set env variables
7. after app modification(run below commands in terminal)  
   npm run build  
   vercel --prod
