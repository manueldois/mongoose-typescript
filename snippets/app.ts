import { User } from "../snippets/populate_select";
import { ID } from "../src/mongoose";
import { IUserDoc } from "../src/user.model";
import { Document } from "mongoose";

User.findOne().then(user => {
    user.password // No error here
})

type Populated<M, K extends keyof M> =
    Omit<M, K> &
    {
        [P in K]: Exclude<M[P], ID[] | ID>
    }

type Select<M, K extends keyof M>
    = Pick<M, K> & Document

async function main() {
    const userWithJustPassword =
        await User.findOne({ email: 'adam@email.com' })
            .select('password') as Select<IUserDoc, 'password'>

    // Friends doesen't exist on this type, and throws a type error
    // userWithJustPassword.friends
    // Password, and document methods exist
    userWithJustPassword.password
    userWithJustPassword.save()
}


