import mongoose, { Schema, Document, Model } from "mongoose";

interface IUsers extends Document {
  first_name: string;
  last_name: string;
  role: string;
  user_id: string;
  email: string;
  phone: string;
  password: string;
}

const UserSchema: Schema<IUsers> = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Users: Model<IUsers> = mongoose.models.Users || mongoose.model<IUsers>("Users", UserSchema);
export default Users;