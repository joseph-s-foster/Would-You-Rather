const mongoose = require('mongoose');

// dev
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wyr-db');

// prod
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wyr');
module.exports = mongoose.connection;
