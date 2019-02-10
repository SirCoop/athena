import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  age: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  location: { type: 'String', required: true },
  skill: { type: 'String', required: true },
  accountInfo: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Profile', profileSchema);
