const Sequelize = require('sequelize');
const User = require('./user');
const Post = require('./post');
const Mapinfo = require('./mapinfo');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];


const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Post = Post;
db.Mapinfo = Mapinfo;

User.init(sequelize);
Post.init(sequelize);
Mapinfo.init(sequelize);

User.associate(db);
Post.associate(db);
Mapinfo.associate(db);

module.exports = db;


