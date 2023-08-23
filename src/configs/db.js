const mongoose = require("mongoose");
require('dotenv').config();
module.exports = mongoose.connect(process.env.URI_VALID_DB).then(() => {
    console.log("your connection is successful.");
}).catch((err) => {
    console.log("no connection", err);
});
