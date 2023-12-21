import mongoose from 'mongoose';

const DB = process.env.URI;
console.log('DB:', process.env.URI);

const connect = mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connection successful");
}).catch((err) => console.error("Connection failed", err));

export default connect;
