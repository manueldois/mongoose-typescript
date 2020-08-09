"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});
const User = mongoose_1.model('User', UserSchema);
exports.User = User;
//# sourceMappingURL=user.model.js.map