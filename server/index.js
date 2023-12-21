import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const DB = process.env.URI;
const PORT = process.env.PORT;

const connect = mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connection successful");
}).catch((err) => console.error("Connection failed", err));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
