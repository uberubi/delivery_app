const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  products: [
    {
      username: String,
      productName: String,
      description: String,
      approved: Boolean,
      createdAt: String,
    },
  ],
});

module.exports = model("User", userSchema);
