const service = require('./service');

const userList = async (req, res, next) => {
    try {
        const userList = await service.userList(req.options)

        return res.status(201).json(userList);
    } catch (e) {
        next(e);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deleteUserData = await service.deleteUser(req.user)

        return res.status(201).json(deleteUserData);
    } catch (e) {
        next(e);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updateUserData = await service.updateUser(req.options, req.user)

        return res.status(201).json(updateUserData);
    } catch (e) {
        next(e);
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const resetPasswordData = await service.resetPassword(req.user)

        return res.status(201).json(resetPasswordData);
    } catch (e) {
        next(e);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const changePasswordData = await service.changePassword(req.params, req.body.password)

        return res.status(201).json(changePasswordData);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    userList,
    updateUser,
    deleteUser,
    resetPassword,
    changePassword
};
