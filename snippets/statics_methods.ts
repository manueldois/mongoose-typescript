import { model, Schema, Document, Types, Model } from 'mongoose'

type ID = Types.ObjectId

interface IUser {
    name: string,
    email: string,
    password: string,
    boss: ID | IUserDoc
}

interface IUserDoc extends IUser, Document {
    getEmployees(): Promise<IUserDoc[]>
}

interface IUserModel extends Model<IUserDoc> {
    findYoungerThan(age: number): Promise<IUserDoc[]>
}

const UserSchemaFields: Record<keyof IUser, any> =  {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    boss: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}

const UserSchema = new Schema(UserSchemaFields)

UserSchema.static('findYoungerThan', function (age: number) {
    const minimumBirthDate = new Date(Date.now() - (age * 365 * 24 * 3600 * 1000))
    return User.find().where('birthdate').gt(minimumBirthDate)
})

UserSchema.method('getEmployees', function (cb: any) {
    return User.find().where('boss').in(this.id).exec()
});

const User = model<IUserDoc, IUserModel>('User', UserSchema)

export { User, IUser }