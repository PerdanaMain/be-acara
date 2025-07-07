import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";

export interface IUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: ["admin", "user"],
      default: "user",
    },
    profilePicture: {
      type: Schema.Types.String,
      default: "user.jpg",
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
      default: "",
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Remove password from the output
  return user;
};

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
