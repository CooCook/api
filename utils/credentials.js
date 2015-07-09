var credentials = {
    opts: {
        server: {
            socketOptions: { keepAlive: 1}
        }
    },
    production: 'mongodb://coocookdba:coocook@ds036698.mongolab.com:36698/coocook',
    development: 'mongodb://coocookdba:coocook@ds036698.mongolab.com:36698/coocook'
};

module.exports = credentials;