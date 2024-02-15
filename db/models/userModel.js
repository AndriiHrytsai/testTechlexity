const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    id: { type: Number, unique: true, default: null },
    first_name: { type: String, default: null, required: true },
    last_name: { type: String, default: null, required: true },
    email: { type: String, unique: true, default: null, required: true },
    password: { type: String, default: null, required: true },
    created_at: { type: String, default: null },
    refresh_token: { type: String, default: null },
    reset_password_link: { type: String, default: null }
});

module.exports = model("User", UserSchema);
