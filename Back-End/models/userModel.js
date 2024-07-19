const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cryptyo = require("crypto");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "name must be more than 2 charcters"],
    },

    email: {
      type: String,
      required: true,
      // unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: [2, "password length must be higher than 2"],
      required: true,
    },
    wishList: Array,
    role: {
      type: String,
      enum: ["Admin", "Buyer"],
      required: true,
    },
    PasswordConfirm: {
      type: String,
      required: [true, "please confirm the requried password"],
      validate: {
        validator: function (el) {
          //chick if password eneted equla confirm password
          //workd on sac
          return el === this.password;
        },
        message: "passowrd are not the same",
      },
    },
    passwordChanhendAT: Date,
    passwordResetToken: String,
    PasswordRestExpiredd: Date,
  },

  { timestamps: true }
);
UserSchema.pre("save", async function () {
  // make sure that password and confirmed password are the same

  //i used bycrypt to hash the password
  this.password = await bcrypt.hash(this.password, 10);
  //deleted the reconfirm password field
  this.PasswordConfirm = undefined;
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChanhendAT = Date.now() - 1000;
  next();
});
UserSchema.methods.createPasswordReastToken = function () {
  const resetToken = cryptyo.randomBytes(32).toString("hex");

  this.passwordResetToken = cryptyo
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.PasswordRestExpiredd = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
