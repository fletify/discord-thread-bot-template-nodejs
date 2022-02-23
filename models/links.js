const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
  guildID: String,
  mode: String,
  ignore: Array
});
module.exports = mongoose.model('links', linkSchema);