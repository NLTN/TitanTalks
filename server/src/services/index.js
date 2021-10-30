const users = require('./users/users.service.js');
const posts = require('./posts/posts.service.js');
const system = require('./system/system.service.js');
const files = require('./files/files.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
    app.configure(posts);
    app.configure(system);
    app.configure(files);
};
