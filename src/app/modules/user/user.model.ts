import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

userSchema.statics.isExistsUser = async function(email:string){
  return await User.findOne({email})
}

export const User = model<TUser, UserModel>('User', userSchema);
