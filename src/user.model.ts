import { Schema, model, Document } from 'mongoose'

interface IUserShared {
    name: string,
    email: string,
}

interface IUserBackend extends IUserShared {
    password: string,
    birthdate: Date
}

interface IUserFrontend extends IUserShared {
    age: number // Exists only on the frontend
}

type TUserDoc = IUserBackend & Document

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    birthdate: Date
})

const User = model<TUserDoc>('User', UserSchema)

export { User, IUserShared, IUserFrontend, IUserBackend } 