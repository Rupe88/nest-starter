import mongoose from 'mongoose';

const DownloadTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  paymentId: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.models.DownloadToken ||
  mongoose.model('DownloadToken', DownloadTokenSchema);
