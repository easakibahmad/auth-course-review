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
