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

1.  User Registration

- Route: /api/auth/register
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

2.  User Login

- Route: /api/auth/login
- Method: POST
- Request Body:
  - example 1: admin
    ```json
    {
      "username": "adminsakib",
      "password": "adminsakib58"
    }
    ```
  - example 2: user
    ```json
    {
      "username": "usersakib",
      "password": "usersakib58"
    }
    ```
- Response:
  - example 1: admin
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "User login successful",
      "data": {
        "user": {
          "_id": "658cb0b62fdf243761f3cd2e",
          "username": "adminsakib",
          "email": "adminsakib@ahmad.com",
          "role": "admin"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThjYjBiNjJmZGYyNDM3NjFmM2NkMmUiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluc2FraWJAYWhtYWQuY29tIiwiaWF0IjoxNzAzNzIwODc3LCJleHAiOjE3MDQ1ODQ4Nzd9.770HDzwQkcXu_OTU3U-Cc-px_TfRNmJ6GF8FvYwYRd8"
      }
    }
    ```
  - example 2: user
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "User login successful",
      "data": {
        "user": {
          "_id": "658cb4042a98dd7803471f5b",
          "username": "usersakib",
          "email": "usersakib@ahmad.com",
          "role": "user"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThjYjQwNDJhOThkZDc4MDM0NzFmNWIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlcnNha2liQGFobWFkLmNvbSIsImlhdCI6MTcwMzcyMTEyMCwiZXhwIjoxNzA0NTg1MTIwfQ.mvi2HRmhrBTZvIRwGycDXUIJ3QRzL2yA-78sHD60ocA"
      }
    }
    ```

3.  Change Password

- Route: /api/auth/change-password
- Method: POST
- Request Headers:
  ```
  Authorization: <JWT_TOKEN>
  ```
- Request Body:
  ```json
  {
    "oldPassword": "usersakib58",
    "newPassword": "pdsakib59"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Password changed successfully",
    "data": {
      "_id": "658cb4042a98dd7803471f5b",
      "username": "usersakib",
      "email": "usersakib@ahmad.com",
      "role": "user",
      "createdAt": "2023-12-27T23:32:20.426Z",
      "updatedAt": "2023-12-28T00:04:11.749Z"
    }
  }
  ```
- Password Change Rules:  
   The system stores only the last 2 previous passwords with timestamps.  
   During a password change attempt:  
   The user cannot reuse any of the last 2 passwords or the current one.  
   If the new password matches any of the previous 2 passwords or the current one, the password change fails.  
   If the new password is unique and different from the current password, the password change is successful.
- Response (if password change failed):
  ```json
  {
    "success": false,
    "statusCode": 400,
    "message": "Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-12-28 at 12:40 AM.)",
    "data": null
  }
  ```

4.  Create a Course (Only Admin can do this)

- Route: Endpoint: /api/courses
- Method: POST
- Request Headers:
  ```
  Authorization: <JWT_TOKEN>
  ```
- Request Body:
  ```json
  {
    "title": "Introduction to Programming",
    "instructor": "Ms. Sarah",
    "categoryId": "658b5e53ff9d65b2db419d72",
    "price": 49.99,
    "tags": [
      { "name": "Programming", "isDeleted": false },
      { "name": "Python", "isDeleted": false }
    ],
    "startDate": "2023-08-15",
    "endDate": "2023-12-15",
    "language": "English",
    "provider": "CodeMaster Institute",
    "details": {
      "level": "Beginner",
      "description": "Start your programming journey with Python basics."
    }
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Course created successfully",
    "data": {
      "_id": "658cc7227a22766eeaf5bda7",
      "title": "Introduction to Programming",
      "instructor": "Ms. Sarah",
      "categoryId": "658cc601a4f73a0262f7ac41",
      "price": 49.99,
      "tags": [
        {
          "name": "Programming",
          "isDeleted": false
        },
        {
          "name": "Python",
          "isDeleted": false
        }
      ],
      "startDate": "2023-08-15",
      "endDate": "2023-12-15",
      "language": "English",
      "provider": "CodeMaster Institute",
      "durationInWeeks": 18,
      "details": {
        "level": "Beginner",
        "description": "Start your programming journey with Python basics."
      },
      "createdBy": "658cb0b62fdf243761f3cd2e",
      "createdAt": "2023-12-28T00:53:54.907Z",
      "updatedAt": "2023-12-28T00:53:54.907Z"
    }
  }
  ```

5.  Get Paginated and Filtered Courses.

- Route: Endpoint: /api/courses
- Method: GET

  When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

- page: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2

- limit: (Optional) Sets the number of items per page. Default is a predefined limit. Example: ?limit=10

- sortBy: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: title, price, startDate, endDate, language, durationInWeeks. Example: ?sortBy=startDate

- sortOrder: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc

- minPrice, maxPrice: (Optional) Filters results by a price range. Example: ?minPrice=20.00&maxPrice=50.00

- tags: (Optional) Filters results by the name of a specific tag. Example: ?tags=Programming

- startDate, endDate: (Optional) Filters results by a date range. Example: ?startDate=2023-01-01&endDate=2023-12-31

- language: (Optional) Filters results by the language of the course. Example: ?language=English

- provider: (Optional) Filters results by the course provider. Example: ?provider=Tech Academy

- durationInWeeks: (Optional) Filters results by the duration of the course in weeks. Example: ?durationInWeeks=8

- level: (Optional) Filters results by the difficulty level of the course. Example: ?level=Intermediate

- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Courses retrieved successfully",
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 6
    },
    "data": {
      "courses": [
        {
          "_id": "658cc7227a22766eeaf5bda7",
          "title": "Introduction to Programming",
          "instructor": "Ms. Sarah",
          "categoryId": "658cc601a4f73a0262f7ac41",
          "price": 49.99,
          "tags": [
            {
              "name": "Programming",
              "isDeleted": false
            },
            {
              "name": "Python",
              "isDeleted": false
            }
          ],
          "startDate": "2023-08-15",
          "endDate": "2023-12-15",
          "language": "English",
          "provider": "CodeMaster Institute",
          "durationInWeeks": 18,
          "details": {
            "level": "Beginner",
            "description": "Start your programming journey with Python basics."
          },
          "createdBy": {
            "_id": "658cb0b62fdf243761f3cd2e",
            "username": "adminsakib",
            "email": "adminsakib@ahmad.com",
            "role": "admin"
          },
          "createdAt": "2023-12-28T00:53:54.907Z",
          "updatedAt": "2023-12-28T00:53:54.907Z"
        },
        {
          "_id": "658cc87e7a22766eeaf5bdaf",
          "title": "Advanced Web Development",
          "instructor": "Mr. Jason",
          "categoryId": "658cc85d7a22766eeaf5bdac",
          "price": 79.99,
          "tags": [
            {
              "name": "Web Development",
              "isDeleted": false
            },
            {
              "name": "JavaScript",
              "isDeleted": false
            }
          ],
          "startDate": "2023-09-10",
          "endDate": "2023-12-31",
          "language": "English",
          "provider": "WebMasters Academy",
          "durationInWeeks": 16,
          "details": {
            "level": "Intermediate",
            "description": "Explore advanced concepts in web development with a focus on JavaScript frameworks."
          },
          "createdBy": {
            "_id": "658cb0b62fdf243761f3cd2e",
            "username": "adminsakib",
            "email": "adminsakib@ahmad.com",
            "role": "admin"
          },
          "createdAt": "2023-12-28T00:59:42.964Z",
          "updatedAt": "2023-12-28T00:59:42.964Z"
        }
        // ... other courses
      ]
    }
  }
  ```

6.  Create a Category (Only Admin can do this)

- Endpoint: /api/categories
- Method: POST
- Request Headers:
  ```
  Authorization: <JWT_TOKEN>
  ```
- Request Body:
  ```json
  {
    "name": "Programming"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
      "_id": "658cc601a4f73a0262f7ac41",
      "name": "Programming",
      "createdBy": "658cb0b62fdf243761f3cd2e",
      "createdAt": "2023-12-28T00:49:05.255Z",
      "updatedAt": "2023-12-28T00:49:05.255Z"
    }
  }
  ```

7.  Get All Categories

- Endpoint: /api/categories
- Method: GET
- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Categories retrieved successfully",
    "data": {
      "categories": [
        {
          "_id": "658cc601a4f73a0262f7ac41",
          "name": "Programming",
          "createdBy": {
            "_id": "658cb0b62fdf243761f3cd2e",
            "username": "adminsakib",
            "email": "adminsakib@ahmad.com",
            "role": "admin"
          },
          "createdAt": "2023-12-28T00:49:05.255Z",
          "updatedAt": "2023-12-28T00:49:05.255Z"
        },
        {
          "_id": "658cc85d7a22766eeaf5bdac",
          "name": "Wev Dev",
          "createdBy": {
            "_id": "658cb0b62fdf243761f3cd2e",
            "username": "adminsakib",
            "email": "adminsakib@ahmad.com",
            "role": "admin"
          },
          "createdAt": "2023-12-28T00:59:09.508Z",
          "updatedAt": "2023-12-28T00:59:09.508Z"
        }
        // ... other categories
      ]
    }
  }
  ```

8.  Create a Review (Only the user can do this)

- Endpoint: /api/reviews
- Method: POST
- Request Headers:
  ```
  Authorization: <JWT_TOKEN>
  ```
- Request Body:
  ```json
  {
    "courseId": "658cc7227a22766eeaf5bda7",
    "rating": 4,
    "review": "This course is organized and nice to learn!!"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Review created successfully",
    "data": {
      "_id": "658ccb7b81aaa2f5da52b7fc",
      "courseId": "658cc7227a22766eeaf5bda7",
      "rating": 4,
      "review": "This course is organized and nice to learn!!",
      "createdBy": {
        "_id": "658ccb3481aaa2f5da52b7f1",
        "username": "usersakib",
        "email": "usersakib@ahmad.com",
        "role": "user"
      },
      "createdAt": "2023-12-28T01:12:27.896Z",
      "updatedAt": "2023-12-28T01:12:27.896Z"
    }
  }
  ```

9.  Update a Course (Only Admin can do this)

- Endpoint: /api/courses/:courseId
- Method: PUT
- Request Headers:
  ```
  Authorization: <JWT_TOKEN>
  ```
- Request Body:
  ```json
  {
    "price": 50.5,
    "tags": [
      { "name": "Easy Programming", "isDeleted": false },
      { "name": "C++", "isDeleted": false }
    ],
    "details": {
      "level": "Beginner",
      "description": "Learn Programming in easy way"
    }
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Course updated successfully",
    "data": {
      "_id": "658cc7227a22766eeaf5bda7",
      "title": "Introduction to Programming",
      "instructor": "Ms. Sarah",
      "categoryId": "658cc601a4f73a0262f7ac41",
      "price": 50.5,
      "tags": [
        {
          "name": "Programming",
          "isDeleted": false
        },
        {
          "name": "Python",
          "isDeleted": false
        },
        {
          "name": "Easy OOP",
          "isDeleted": false
        },
        {
          "name": "Thread",
          "isDeleted": false
        },
        {
          "name": "Easy Programming",
          "isDeleted": false
        },
        {
          "name": "C++",
          "isDeleted": false
        }
      ],
      "startDate": "2023-08-15",
      "endDate": "2023-12-15",
      "language": "English",
      "provider": "CodeMaster Institute",
      "durationInWeeks": 18,
      "details": {
        "level": "Beginner",
        "description": "Learn Programming in easy way"
      },
      "createdBy": {
        "_id": "658cb0b62fdf243761f3cd2e",
        "username": "adminsakib",
        "email": "adminsakib@ahmad.com",
        "role": "admin"
      },
      "createdAt": "2023-12-28T00:53:54.907Z",
      "updatedAt": "2023-12-28T01:16:52.540Z"
    }
  }
  ```

10. Get Course by ID with Reviews

- Endpoint: /api/courses/:courseId/reviews
- Method: GET
- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Course with reviews retrieved successfully",
    "data": {
      "course": {
        "_id": "658cc7227a22766eeaf5bda7",
        "title": "Introduction to Programming",
        "instructor": "Ms. Sarah",
        "categoryId": "658cc601a4f73a0262f7ac41",
        "price": 50.5,
        "tags": [
          {
            "name": "Programming",
            "isDeleted": false
          },
          {
            "name": "Python",
            "isDeleted": false
          },
          {
            "name": "Easy OOP",
            "isDeleted": false
          },
          {
            "name": "Thread",
            "isDeleted": false
          },
          {
            "name": "Easy Programming",
            "isDeleted": false
          },
          {
            "name": "C++",
            "isDeleted": false
          }
        ],
        "startDate": "2023-08-15",
        "endDate": "2023-12-15",
        "language": "English",
        "provider": "CodeMaster Institute",
        "durationInWeeks": 18,
        "details": {
          "level": "Beginner",
          "description": "Learn Programming in easy way"
        },
        "createdBy": {
          "_id": "658cb0b62fdf243761f3cd2e",
          "username": "adminsakib",
          "email": "adminsakib@ahmad.com",
          "role": "admin"
        },
        "createdAt": "2023-12-28T00:53:54.907Z",
        "updatedAt": "2023-12-28T01:16:52.540Z"
      },
      "reviews": [
        {
          "_id": "658ccb7b81aaa2f5da52b7fc",
          "courseId": "658cc7227a22766eeaf5bda7",
          "rating": 4,
          "review": "This course is organized and nice to learn!!",
          "createdBy": {
            "_id": "658ccb3481aaa2f5da52b7f1",
            "username": "usersakib",
            "email": "usersakib@ahmad.com",
            "role": "user"
          },
          "createdAt": "2023-12-28T01:12:27.896Z",
          "updatedAt": "2023-12-28T01:12:27.896Z"
        },
        {
          "_id": "658ccd3d81aaa2f5da52b886",
          "courseId": "658cc7227a22766eeaf5bda7",
          "rating": 5,
          "review": "Nice and Good!!",
          "createdBy": {
            "_id": "658ccb3481aaa2f5da52b7f1",
            "username": "usersakib",
            "email": "usersakib@ahmad.com",
            "role": "user"
          },
          "createdAt": "2023-12-28T01:19:57.199Z",
          "updatedAt": "2023-12-28T01:19:57.199Z"
        },
        {
          "_id": "658ccd4281aaa2f5da52b891",
          "courseId": "658cc7227a22766eeaf5bda7",
          "rating": 3,
          "review": "Nice and Good!!",
          "createdBy": {
            "_id": "658ccb3481aaa2f5da52b7f1",
            "username": "usersakib",
            "email": "usersakib@ahmad.com",
            "role": "user"
          },
          "createdAt": "2023-12-28T01:20:02.156Z",
          "updatedAt": "2023-12-28T01:20:02.156Z"
        }
        // ... other reviews
      ]
    }
  }
  ```

11. Get the Best Course Based on Average Review (Rating)

- Endpoint: /api/course/best
- Method: GET
- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Best course retrieved successfully",
    "data": {
      "course": {
        "_id": "658cc7227a22766eeaf5bda7",
        "title": "Introduction to Programming",
        "instructor": "Ms. Sarah",
        "categoryId": "658cc601a4f73a0262f7ac41",
        "price": 50.5,
        "tags": [
          {
            "name": "Programming",
            "isDeleted": false
          },
          {
            "name": "Python",
            "isDeleted": false
          },
          {
            "name": "Easy OOP",
            "isDeleted": false
          },
          {
            "name": "Thread",
            "isDeleted": false
          },
          {
            "name": "Easy Programming",
            "isDeleted": false
          },
          {
            "name": "C++",
            "isDeleted": false
          }
        ],
        "startDate": "2023-08-15",
        "endDate": "2023-12-15",
        "language": "English",
        "provider": "CodeMaster Institute",
        "durationInWeeks": 18,
        "details": {
          "level": "Beginner",
          "description": "Learn Programming in easy way"
        },
        "createdBy": {
          "_id": "658cb0b62fdf243761f3cd2e",
          "username": "adminsakib",
          "email": "adminsakib@ahmad.com",
          "role": "admin"
        },
        "createdAt": "2023-12-28T00:53:54.907Z",
        "updatedAt": "2023-12-28T01:16:52.540Z"
      },
      "averageRating": 4.2,
      "reviewCount": 6
    }
  }
  ```

# Error handling

1. Implemented CastError, DuplicateError, ValidationError, ZodValidationError separately
2. Custom AppError handler created
3. Also created global error handler
4. JWT error handling
5. NotFoundRoute implemented
6. For validating request created ValidateRequest.ts file

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
