import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from '../../config';
import { Student } from "../student/student.model";

const userSchema = new Schema<TUser, UserModel>({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:0
    },
    needsPasswordChange:{
        type:Boolean,
        default:true
    },
    passwordChangedAt:{
        type:Date,
    },
    role:{
        type:String,
        enum:['student', 'admin', 'faculty'],
        required:true
    },
    status:{
        type:String,
        enum:['in-progress', 'blocked'],
        default:'in-progress'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
}, {timestamps:true});


//Static Method
userSchema.statics.isExistsUser = async function(id:string){
   return await User.findOne({id}).select('password role status needsPasswordChange id isDeleted')
}

userSchema.statics.isPasswordMatched = async function(plainPassword:string, hashedPassword:string){
   return await bcrypt.compare(plainPassword, hashedPassword)
}

userSchema.pre('save', function(next){
    const pwd = this.password || config.default_password as string;
    const hash = bcrypt.hashSync(pwd, Number(config.salt_round));
    this.password = hash;
    next()
})

export const User = model<TUser, UserModel>('User', userSchema);
