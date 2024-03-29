module.exports = {
    doom: require('./doom.helper'),
    general: require('./general.helper'),
    header: require('./header.helper'),
    token: require('./token.helper'),
    validator: require('./validator.helper'),
    mailer: require('./mailer.helper'),

    middlewares: {
        auth: require('../middlewares/auth.handler'),
        cors: require('../middlewares/cors.handler'),
        error: require('../middlewares/error.handler'),
        notFound: require('../middlewares/not-found.handler'),
    },
};
