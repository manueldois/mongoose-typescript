import { Schema, model, Document } from 'mongoose'

interface IUser {
    name: string,
    email: string,
    password: string
}

type TUserDoc = IUser & Document

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const User = model<TUserDoc>('User', UserSchema)

export { User, IUser } 