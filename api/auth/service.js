const bcrypt = require('bcryptjs');
const moment = require("moment");

const helper = require('../../app/helpers/helper');
const UserModel = require("../../db/models/userModel");

const registration = async (options) => {
    const candidate = await UserModel.findOne({ email: options.email });
    if (candidate) {
        return helper.doom.error.emailAlreadyRegistered();
    }
    const date = moment().format("DD/MM/YYYY");

    const currentId = await UserModel.aggregate([
        { $sort: { _id: -1 } },
        { $limit: 1 },
    ]);

    const hashPassword = await bcrypt.hash(options.password, 10);
    const newUser = await UserModel.create({
        ...options,
        id: currentId.length ? currentId[0].id + 1 : 1,
        created_at: date,
        password: hashPassword,
    });

    return {
        'success': true,
        'result': {
            email: newUser.email,
            id: newUser.id,
        },
    }
}

const login = async (options) => {
    const user = await UserModel.findOne({ email: options.email });

    if (user === null) {
        return helper.doom.error.emailNotFound(options.email);
    }

    let isPasswordsEquals = bcrypt.compareSync(options.password, user.password);
    if (!isPasswordsEquals) {
        return helper.doom.error.passwordNotValid();
    }

    const tokens = helper.token.generateTokens({ sub: user.id, email: user.email });

    user.refresh_token = tokens.refreshToken;
    await user.save()

    return {
        "success": true,
        "result": { ...tokens, email: user.email, id: user.id }
    }
}

const logout = async (refreshToken) => {
    await UserModel.findOneAndUpdate(
        { refresh_token: refreshToken },
        { $set: { refresh_token: null } },
        { new: true }
    );

    return {
        "success": true,
        "result": "Logout successfully."
    }
}

const refresh = async (refreshToken) => {
    if (!refreshToken) {
        return helper.doom.error.Unauthorized();
    }

    const userData = helper.token.validateRefreshToken(refreshToken);
    const user = await UserModel.findOne({ refresh_token: refreshToken });

    if (!userData || !user) {
        return helper.doom.error.Unauthorized();
    }

    const tokens = helper.token.generateTokens({ sub: user.id, email: user.email });

    user.refresh_token = tokens.refreshToken;
    await user.save()

    return {
        "success": true,
        "result": { ...tokens, email: user.email, id: user.id }
    }
}

module.exports = {
    registration,
    login,
    logout,
    refresh
};

