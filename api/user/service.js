const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require("uuid");

const helper = require('../../app/helpers/helper');
const UserModel = require("../../db/models/userModel");
const { forgotPasswordEmail } = require("../../app/emailTemplates/forgotPassword");

const userList = async (options) => {
    const page = options.page || 1;
    const limit = options.limit || 10;

    const users = await UserModel.aggregate([
        { $match: {} },
        {
            $project: {
                password: 0,
                reset_password_link: 0,
                _id: 0,
                __v: 0,
                refresh_token: 0
            },
        },
        { $skip: (page - 1) * limit },
        { $limit: limit }
    ]);

    return {
        'success': true,
        'result': {
            users
        },
    }
}

const deleteUser = async (user) => {
    await UserModel.findOneAndDelete({ id: user.id });

    return {
        "success": true,
        "result": "User successfully deleted"
    }
}

const updateUser = async (options, userData) => {
    const user = await UserModel.findOneAndUpdate(
        { id: userData.id },
        { ...options },
        { new: true, projection: { password: 0, __v: 0, _id: 0, reset_password_link: 0, refresh_token: 0 } }
    );

    return {
        "success": true,
        "result": user
    }
}

const resetPassword = async (userData) => {
    const user = await UserModel.findOne({ id: userData.id });
    if (!user) {
        return helper.doom.error.accountNotFound();
    }

    const resetLink = uuidv4();
    user.reset_password_link = resetLink;
    await user.save();

    const mailLetter = forgotPasswordEmail(
        `${process.env.CLIENT_URL}/change-password/${resetLink}`,
        user.first_name
    );

    await helper.mailer(user.email, 'Reset password', mailLetter);

    return {
        "success": true,
        "result": 'Please go to your mailbox to change your password'
    }
}

const changePassword = async (resetPasswordLink, newPassword) => {
    console.log(resetPasswordLink)
    const user = await UserModel.findOne({ reset_password_link: resetPasswordLink });
    if (!user) {
        return helper.doom.error.accountNotFound();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.reset_password_link = null;

    await user.save();

    return {
        "success": true,
        "result": "user password successfully updated"
    }
}

module.exports = {
    updateUser, deleteUser, userList, resetPassword, changePassword
};

