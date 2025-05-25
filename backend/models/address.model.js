import mongoose from 'mongoose';
const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  street: String,
  city: String,
  district: String,
  ward: String,
  note: String,
});
export default addressSchema;
