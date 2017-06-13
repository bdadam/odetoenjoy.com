require('ignore-styles');
require('babel-register');
const server = require('./src/server').default;
server.listen(process.env.PORT || 3000);