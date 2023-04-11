import { mongoose } from "mongoose";
const url = "mongodb://localhost:27017/library-management";

mongoose.set('debug', (collectionName, method, query, doc) => {
console.log(collectionName, method, query, doc)
});

mongoose.set("strictQuery", true);
export const connectDB = async () => {
  try {
    const db = await mongoose.connect(url);
    console.log(`DB connected ${db.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
