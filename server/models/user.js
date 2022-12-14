const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const time = {
  timestamps: {
    currentTime: () => new Date().setHours(new Date().getHours() + 2),
  },
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    avatar: {
      type: Buffer,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
    },
    refreshToken: [String],
  },

  time
);

userSchema.pre("save", async function (next) {
  let user=this
if (!user.isModified('password')) return 333;
if(user.isModified("password")){console.log('yes modified')}

user.password = await bcrypt.hash(
  user.password,
    parseInt(process.env.saltRounds)
  );
  console.log('pre save password: ' + user.password);
  if(user.isModified("password")){console.log('yes modifieddd')}



  next();
});


const User = mongoose.model("user", userSchema);
module.exports = User;
