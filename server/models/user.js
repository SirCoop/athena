import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  created: { type: Date, default : () => new Date()},
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userProfile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  // passwordHash: { type: String, required: true, unique: true },
  // tokenSeed: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

export default mongoose.model('User', userSchema);
