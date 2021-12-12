# Back-end

## Set up Instructions

After you have pulled the repository to the machine.
Create and sql database in your local host.
Configure the database.js (/Backend/src/util/database.js) with your database's information.
In a terminal after you are in this folder type:

- npm install
- npm start

The first command install the dependencies.
The second start the server and creates your Database schema.
The api listens at local host port 8765.
The base URL is: http://localhost:8765/evcharge/api

## Putting data in your database

In folder db (/back-end/db)there are 2 files.

- data
- transactions.csv

With the data.txt you can copy the code and run it inside your workbench sql
so you get all the sample data except the tsansactions.
To add the transactions you upload the csv to the {baseURL}/admin/system/sessionsupd endpoint.
After that you can configure the database in any way you want from
your workbench, back-end or cli.

## Testing

Inside the Test folder (/back-end/test) there the test files.
To run them you simple run npm test in the back-end directory.

Also, inside the data folder (/back-end/data) there is a collection of postman request
that was used for testing our backend.
