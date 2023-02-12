const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Mongo = async () => {
  console.log("hello");
  try {
    console.log(process.env.URL);
    const connect = await mongoose.connect(process.env.URL);
    console.log(`mongodb connected ${connect} `);
  } catch {
    console.log(`${Error} This is the error`);
    process.exit(1);
  }
};
module.exports = Mongo;
