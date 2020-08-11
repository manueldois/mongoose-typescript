import { User } from "../snippets/typed_model";

User.findOne().then(user => {
    user.password // No error here
})