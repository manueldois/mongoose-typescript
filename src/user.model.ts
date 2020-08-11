import { Schema, model, Document, Model } from 'mongoose'
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

type TUserDoc = IUserBackend & Document & {
    getEmployees(): Promise<TUserDoc[]>
}

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

interface IUserModel extends Model<TUserDoc> {
    findYoungerThan(age: number): Promise<TUserDoc[]>
}

const UserSchema = new Schema(UserSchemaFields)

UserSchema.static('findYoungerThan', function (age: number) {
    const minimumBirthDate = new Date(Date.now() - (age * 365 * 24 * 3600 * 1000))
    return User.find().where('birthdate').gt(minimumBirthDate)
})

UserSchema.method('getEmployees', function (cb: any) {
    return User.find().where('boss').in(this.id).exec()
});

const User = model<TUserDoc, IUserModel>('User', UserSchema)

export { User, TUserDoc, IUserShared, IUserFrontend, IUserBackend } 