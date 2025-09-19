import mongoose, { Schema, model, models } from 'mongoose';

const PaymentSchema = new Schema(
  {
    paymentId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    productId: { type: String, required: true },
    status: { type: String, required: true }, // succeeded, pending, failed
    raw: { type: Object },
  },
  { timestamps: true }
);

export const Payment = models.Payment || model('Payment', PaymentSchema);
