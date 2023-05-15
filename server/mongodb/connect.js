import mongoose from 'mongoose';

const connectDB = (url) => {
  /* `This means that Mongoose will throw an error if a query is attempted with undefined
  fields or fields that are not defined in the schema. This helps ensure that data is properly
  validated and prevents unexpected behavior. */
  mongoose.set('strictQuery', true);

  mongoose.connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
}

export default connectDB;