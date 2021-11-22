const mongoose = require("mongoose");

/************************* 
		Set Up DB 
*************************/
module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    await mongoose.connect(process.env.MONGO_URL, connectionParams);
    console.log("connected to Db...");
  } catch (error) {
    console.log("could not connect to database", error);
  }
};
