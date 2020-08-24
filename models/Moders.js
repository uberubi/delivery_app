const { model, Schema } = require("mongoose");

const moderSchema = new Schema({
  username: String,
  password: String,
  createdAt: String,
});

module.exports = model("Moder", moderSchema);