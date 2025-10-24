import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';

const Schema = mongoose.Schema

export const jwtsecret = 'HelloIamsecret'

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Enter user name'],
        maxLength: [20, 'Name should not exceed 20 Characters']
    },
    email: {
        type: String,
        required: [true, 'Please type email'],
        unique: [true, 'email should be unique']
    },
    password: {
        type: String,
        minLength: [8, 'Password should not be less than 20 characters'],
        required: [true, 'Please enter the password']
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    }
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log('I am in pre function')
        const salt = await bcryptjs.genSalt(10)
        this.password = await bcryptjs.hash(this.password as string, salt)
    }
})

UserSchema.methods.getJWTtoken = function () {
    const token = JWT.sign({ id: this._id }, jwtsecret, { expiresIn: '10s' })
    return token
}

interface iUser extends mongoose.Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "User" | "Admin";
    getJWTtoken: () => string

}

export const User = mongoose.model<iUser>('user', UserSchema)