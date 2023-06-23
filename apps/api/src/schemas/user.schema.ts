import { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export { userSchema };
