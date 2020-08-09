import { Schema, model, Document, Types } from 'mongoose'

type ID = Types.ObjectId
interface IUserShared {
    name: string,
    email: string,
    friends: ID[] | TUserDoc[]
}

interface IUserBackend extends IUserShared {
    password: string,
    birthdate: Date,
}

interface IUserFrontend extends IUserShared {
    age: number // Exists only on the frontend
}

type TUserDoc = IUserBackend & Document

const UserSchemaFields: Record<keyof IUserBackend, any> = {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    birthdate: Date,
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}

const UserSchema = new Schema(UserSchemaFields)

const User = model<TUserDoc>('User', UserSchema)

export { User, TUserDoc, IUserShared, IUserFrontend, IUserBackend } 