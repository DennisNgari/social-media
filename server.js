const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

//Middlewares
require("dotenv").config();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

/************************* 
		Connect to the DB 
*************************/
const connection = require("./app/controllers/db");
connection();

/*******************************
		Import Routes
*******************************/
const postsRoute = require("./app/routes/posts");
const userRoute = require("./app/routes/users");
const authRoute = require("./app/routes/auth");

/*******************************
		Initialize Routes
*******************************/
app.use("/api/posts", postsRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

/*******************************
		Set port, listen for requests
*******************************/
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
