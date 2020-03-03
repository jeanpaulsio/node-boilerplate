import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/node-boilerplate-api-test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
