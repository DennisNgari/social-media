const express = require("express");
const app = express();

// Load ENV Variables
require("dotenv").config();
app.use(express.json());

/************************* 
		Connect to the DB 
*************************/
const connection = require("./app/controllers/db");
connection();

/*******************************
		Import Routes
*******************************/

/*******************************
		Initialize Routes
*******************************/

/*******************************
		Set port, listen for requests
*******************************/
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
