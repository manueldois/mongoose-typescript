import { model, Schema, Document, Types } from 'mongoose'

type ID = Types.ObjectId

interface IUser {
    name: string,
    email: string,
    password: string,
    friends: ID[] | IUserDoc[],
    boss: ID | IUserDoc,
}

interface IUserDoc extends IUser, Document {}

const UserSchemaFields: Record<keyof IUser, any> =  {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
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

const User = model<IUserDoc>('User', UserSchema)

export { User, IUser }