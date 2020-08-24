module.exports = {
  Mutation: {
    async moderLogin(_, { modername, password }) {
      const { errors, valid } = validateLoginInput(modername, password);
      const moder = await Moder.findOne({ modername });

      if (!moder) {
        errors.general = "Moderator not found";
        throw new UserInputError("Moderator not found", { errors });
      }

      const match = await bcrypt.compare(password, moder.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(moder);

      return {
        ...moder._doc,
        id: moder._id,
        token,
      };
    },
  }
}