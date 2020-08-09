"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("./user.model");
mongoose
    .connect('mongodb://localhost:27017/tests', {
    autoIndex: false,
    useNewUrlParser: true
})
    .then(() => {
    console.log("Connected to DB");
    main();
})
    .catch(err => console.error("Error connecting to DB: ", err));
async function main() {
    // user is of type IUser
    const user = await user_model_1.User.findOne({ email: 'someemail@e.com' });
    console.log("Found User: ", user);
}
async function seed() {
    const newUser = await user_model_1.User.create({ email: 'someemail@e.com', password: 'abcdef', name: 'Mr. Smith' });
    console.log("Created User: ", newUser);
}
//# sourceMappingURL=app.js.map