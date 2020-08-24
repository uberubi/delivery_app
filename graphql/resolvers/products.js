const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    getProductsForApprove: async () => {
      try {
        const users = await User.find();

        const productsForApprove = users.map((u) => {
          return u.products.filter((p) => !p.approved);
        });

        console.log("PRODUCTS>>>", [].concat(...productsForApprove));
        return [].concat(...productsForApprove);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createProduct: async (_, { userId, productName, description }, context) => {
      const { username } = checkAuth(context);

      if (productName.trim() === "") {
        throw new UserInputError("Empty name", {
          errors: {
            productName: "Name of product must not be empty",
          },
        });
      }
      if (description.trim() === "") {
        throw new UserInputError("Empty description", {
          errors: {
            description: "Description must not be empty",
          },
        });
      }

      const user = await User.findById(userId);

      if (user) {
        // user.products.unshift({
        //   username,
        //   productName,
        //   description,
        //   createdAt: new Date().toISOString(),
        // });
        user.products = [
          ...user.products,
          {
            username,
            userId: user.id,
            productName,
            description,
            approved: false,
            createdAt: new Date().toISOString(),
          },
        ];
        await user.save();
        return user;
      } else {
        throw new UserInputError("User not found");
      }
    },

    async deleteProduct(_, { userId, productId }, context) {
      console.log(userId, productId);
      const { username } = checkAuth(context);
      const user = await User.findById(userId);
      if (user) {
        const productIndex = user.products.findIndex((p) => p.id === productId);

        if (user.products[productIndex].username === username) {
          user.products.splice(productIndex, 1);
          // user = user.products.filter((p,i) => i !== productIndex)
          await user.save();
          return user;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("User not found");
      }
    },
    async approveProduct(_, {userId ,productId}, context) {
      const {username} = checkAuth(context)
      const user = await User.findById(userId)
      if (user) {
        user.products.forEach(p => {
          if (p.id === productId) {
            p.approved = true
          }
        })
        await user.save()
        return user
      } else {
        throw new UserInputError("This product doesn't exist already")
      }
    }
  },
}
