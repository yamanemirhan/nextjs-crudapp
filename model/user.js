import { Schema, models, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  date: String,
  status: String,
  salary: Number,
});

const User = models.user || model('user', userSchema);
export default User;
