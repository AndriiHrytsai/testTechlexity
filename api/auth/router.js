const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/registration',
    validator.main(schemas.router.registration),
    asyncHandler(controller.registration),
);

router.post('/login',
    validator.main(schemas.router.login),
    asyncHandler(controller.login),
);

router.post('/logout',
    asyncHandler(middlewares.auth.user),
    asyncHandler(controller.logout),
);

router.post('/refresh',
    asyncHandler(middlewares.auth.user),
    asyncHandler(controller.refresh),
);

module.exports = router;
