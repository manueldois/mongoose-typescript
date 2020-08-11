import { model, Schema, Document } from 'mongoose'

interface IUser {
    name: string,
    email: string,
    password: string,
}

interface IUserDoc extends IUser, Document {}

const UserSchemaFields: Record<keyof IUser, any> =  {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}

const UserSchema = new Schema(UserSchemaFields)

const User = model<IUserDoc>('User', UserSchema)

export { User, IUser }