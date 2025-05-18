// models/User.js
import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile:String,
  password: String,
});

const User = mongoose.model('User', userSchema);
export default User;


 