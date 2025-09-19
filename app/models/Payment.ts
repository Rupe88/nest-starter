import mongoose, { Schema, model, models } from 'mongoose';

interface IPayment {
  paymentId: string;
  status: 'succeeded' | 'pending' | 'failed';
  amount: number;
  currency: string;
  email?: string; // optional
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  paymentId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['succeeded', 'pending', 'failed'],
    required: true,
  },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.Payment || model<IPayment>('Payment', paymentSchema);
