import { model, Schema, Document } from 'mongoose'

// Fields that exist both on the frontend and the backend
interface IUserShared {
    name: string,
    email: string,
}

// Fields that exist only in the backend
interface IUserBackend extends IUserShared {
    password: string,
    birthdate: Date,
}

// Fields that exist only in the frontend.
interface IUserFrontend extends IUserShared {
    age: number // Exists only on the frontend
}

interface IUserDoc extends IUserBackend, Document {}

const UserSchemaFields: Record<keyof IUserBackend, any> =  {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    birthdate: Date,
}

const UserSchema = new Schema(UserSchemaFields)

const User = model<IUserDoc>('User', UserSchema)

export { User, IUserBackend, IUserFrontend, IUserShared }