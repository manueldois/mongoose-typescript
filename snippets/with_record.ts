import { model, Schema } from 'mongoose'

interface IUser {
    name: string,
    email: string,
    password: string,
}

const UserSchemaFields: Record<keyof IUser, any> =  {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}

const UserSchema = new Schema(UserSchemaFields)

const User = model('User', UserSchema)

export { User, IUser }