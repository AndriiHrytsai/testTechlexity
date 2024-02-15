const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');
const service = require('./service');

const registration = async (req, res, next) => {
    try {
        const userData = await service.registration(req.options)

        return res.status(201).json(userData);
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const userData = await service.login(req.options)

        return res.status(201).json(userData);
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const refreshToken = req.headers.update.slice(
            req.headers.update.indexOf("=") + 1
        );

        const userData = await service.logout(refreshToken)

        return res.status(201).json(userData);
    } catch (e) {
        next(e);
    }
}

const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.headers.update.slice(
            req.headers.update.indexOf("=") + 1
        );

        const userData = await service.refresh(refreshToken)

        return res.status(201).json(userData);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    registration,
    login,
    logout,
    refresh
};
