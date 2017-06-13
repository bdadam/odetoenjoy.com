const server = require('./dist-server/server').default;
server.listen(process.env.PORT || 3000);