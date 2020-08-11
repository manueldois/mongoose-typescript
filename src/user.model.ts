import { Schema, model, Document } from 'mongoose'
import { ID } from './mongoose'

interface IUserShared {
    name: string,
    email: string,
    friends: ID[] | TUserDoc[],
    boss: ID | TUserDoc,
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
    }],
    boss: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}

const UserSchema = new Schema(UserSchemaFields)

const User = model<TUserDoc>('User', UserSchema)

export { User, TUserDoc, IUserShared, IUserFrontend, IUserBackend } 