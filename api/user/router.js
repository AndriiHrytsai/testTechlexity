const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/list',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.userList),
    asyncHandler(controller.userList),
);

router.delete('/delete/account',
    asyncHandler(middlewares.auth.user),
    asyncHandler(controller.deleteUser),
);

router.put('/update-profile-data',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.updateUser),
    asyncHandler(controller.updateUser),
);

router.post("/reset-password",
    asyncHandler(middlewares.auth.user),
    asyncHandler(controller.resetPassword),
);
router.put("/change-password/:resetLink",
    validator.main(schemas.router.resetPassword),
    asyncHandler(controller.changePassword),
);

module.exports = router;
