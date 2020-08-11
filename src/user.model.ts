import { Schema, model, Document, Model } from 'mongoose'
import { ID } from './mongoose'

// Fields that exist both on the frontend and the backend
interface IUserShared {
    name: string,
    email: string,
    friends: ID[] | IUserDoc[],
    boss: ID | IUserDoc,
}

// Fields that exist only in the backend
interface IUserBackend extends IUserShared {
    password: string,
    birthdate: Date,
}

// Fields that exist only in the frontend.
// This should be imported into your frontend code.
interface IUserFrontend extends IUserShared {
    age: number // Exists only on the frontend
}

// Interface for the mongoose document. aka: with save(), _id, etc,
// and declaration of custom instance methods
interface IUserDoc extends IUserBackend, Document {
    getEmployees(): Promise<IUserDoc[]>
}

// The fields for the mongoose schema, linked by key name to the IUserBackend interface
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

// Interface for the User model, with declaration of custom statics
interface IUserModel extends Model<IUserDoc> {
    findYoungerThan(age: number): Promise<IUserDoc[]>
}

// Creating the user schema, declaring statics and methods
const UserSchema = new Schema(UserSchemaFields)

UserSchema.static('findYoungerThan', function (age: number) {
    const minimumBirthDate = new Date(Date.now() - (age * 365 * 24 * 3600 * 1000))
    return User.find().where('birthdate').gt(minimumBirthDate)
})

UserSchema.method('getEmployees', function (cb: any) {
    return User.find().where('boss').in(this.id).exec()
});

// Passing our types to the model function so the User model is extended
const User = model<IUserDoc, IUserModel>('User', UserSchema)

export { User, IUserDoc, IUserShared, IUserFrontend, IUserBackend } 