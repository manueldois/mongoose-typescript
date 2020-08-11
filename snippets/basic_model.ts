import { model, Schema } from 'mongoose'

interface IUser {
    username: string,
    email: string,
    password: string,
}

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const User = model('User', UserSchema)

export { User, IUser }

