'use strict';

const path = require('path');

const Sequelize = require('sequelize');

//read config/db.json
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','config','db.json'))[
    env
]

const db = {};


//connection db.json
let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        }
    }
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
.authenticate()
.then(() => {
    console.log("Connection has been established successfully.");
})
.catch(err => {
    console.log('Unable to connect to the database: ',err);
})

//upload db

db.User = require('./user')(sequelize,Sequelize);
db.Board = require('./board')(sequelize,Sequelize);
db.Story = require('./story')(sequelize,Sequelize);

//create one to many relationship User&Board

db.User.hasMany(db.Board, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})

db.Board.belongsTo(db.User, {
    foreignKey: 'user_id',
    targetKey: 'id'
})


//create one to many relationship Board&Story
db.Board.hasMany(db.Story, {
    foreignKey: 'board_id',
    sourceKey: 'id'
})

db.Story.belongsTo(db.Board, {
    foreignKey: 'board_id',
    targetKey: 'id'
})


db.secret = "(9*)5$&!3%^0%^@@2$1!#5@2!4"

module.exports = db;